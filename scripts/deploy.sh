#!/bin/bash
# ================================================
# Quick Deploy Script - Deploy manually to EC2
# Usage: ./scripts/deploy.sh
# ================================================

set -euo pipefail

APP_NAME="nodejs-cicd-demo"
EC2_HOST="${EC2_HOST:-3.0.146.139}"
EC2_USER="${EC2_USER:-ubuntu}"
SSH_KEY="${SSH_KEY:-~/.ssh/key.pem}"

echo "╔══════════════════════════════════════════╗"
echo "║   🚀 Manual Deploy - $APP_NAME           ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Step 1: Run tests locally
echo "🧪 Step 1: Running tests..."
node --test src/tests/ || { echo "❌ Tests failed!"; exit 1; }
echo "✅ Tests passed!"
echo ""

# Step 2: Build Docker image
echo "🐳 Step 2: Building Docker image..."
docker build -t $APP_NAME:latest .
echo "✅ Image built!"
echo ""

# Step 3: Save and transfer image
echo "📦 Step 3: Transferring image to EC2..."
docker save $APP_NAME:latest | gzip > /tmp/$APP_NAME.tar.gz
scp -i $SSH_KEY -o StrictHostKeyChecking=no /tmp/$APP_NAME.tar.gz $EC2_USER@$EC2_HOST:/tmp/
rm /tmp/$APP_NAME.tar.gz
echo "✅ Image transferred!"
echo ""

# Step 4: Deploy on EC2
echo "🚀 Step 4: Deploying on EC2..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << 'DEPLOY_SCRIPT'
  APP_NAME="nodejs-cicd-demo"

  # Stop old container
  docker stop $APP_NAME 2>/dev/null || true
  docker rm $APP_NAME 2>/dev/null || true

  # Load new image
  docker load < /tmp/$APP_NAME.tar.gz
  rm /tmp/$APP_NAME.tar.gz

  # Run new container
  docker run -d \
    --name $APP_NAME \
    --restart unless-stopped \
    -p 3000:3000 \
    -e NODE_ENV=production \
    -e APP_VERSION=$(date +%Y%m%d-%H%M%S) \
    --memory=128m \
    --cpus=0.5 \
    $APP_NAME:latest

  # Wait and health check
  sleep 3
  if curl -sf http://localhost:3000/health > /dev/null; then
    echo "✅ Deployment successful!"
    curl -s http://localhost:3000/health | python3 -m json.tool
  else
    echo "❌ Deployment failed!"
    docker logs $APP_NAME
    exit 1
  fi
DEPLOY_SCRIPT

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ✅ Deploy Complete!                     ║"
echo "║   🌐 http://$EC2_HOST:3000               ║"
echo "╚══════════════════════════════════════════╝"
