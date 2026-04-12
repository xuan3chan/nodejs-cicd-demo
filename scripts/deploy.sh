#!/bin/bash

set -euo pipefail

EC2_HOST="${EC2_HOST:-3.0.146.139}"
EC2_USER="${EC2_USER:-ubuntu}"
SSH_KEY="${SSH_KEY:-~/.ssh/key.pem}"
APP_DIR="${APP_DIR:-~/app}"
BACKEND_IMAGE="azure-kitchen-backend:latest"
FRONTEND_IMAGE="azure-kitchen-frontend:latest"

echo "Running local checks..."
(cd client && npm ci && npm run build)
(cd server && npm ci && npm run lint && npm test && npm run build)

echo "Building Docker images..."
docker build -t "$BACKEND_IMAGE" -f Dockerfile .
docker build -t "$FRONTEND_IMAGE" -f nginx/Dockerfile .

echo "Saving Docker images..."
docker save "$BACKEND_IMAGE" | gzip > /tmp/backend-image.tar.gz
docker save "$FRONTEND_IMAGE" | gzip > /tmp/frontend-image.tar.gz

echo "Copying deployment files to EC2..."
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no \
  /tmp/backend-image.tar.gz \
  /tmp/frontend-image.tar.gz \
  docker-compose.yml \
  "$EC2_USER@$EC2_HOST:/tmp/"

rm -f /tmp/backend-image.tar.gz /tmp/frontend-image.tar.gz

echo "Deploying on EC2..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" <<'DEPLOY_SCRIPT'
  set -euo pipefail

  APP_DIR="${APP_DIR:-$HOME/app}"
  mkdir -p "$APP_DIR"

  docker stop azure-kitchen-backend nginx-proxy 2>/dev/null || true
  docker rm azure-kitchen-backend nginx-proxy 2>/dev/null || true

  docker load < /tmp/backend-image.tar.gz
  docker load < /tmp/frontend-image.tar.gz
  rm -f /tmp/backend-image.tar.gz /tmp/frontend-image.tar.gz

  cp /tmp/docker-compose.yml "$APP_DIR/docker-compose.yml"
  rm -f /tmp/docker-compose.yml

  cd "$APP_DIR"
  docker compose up -d --no-build --remove-orphans

  sleep 15
  if curl -sf http://localhost/api/health > /dev/null; then
    echo "Deployment successful"
    docker compose ps
  else
    echo "Deployment failed"
    docker compose logs backend --tail=50
    docker compose logs nginx --tail=20
    exit 1
  fi
DEPLOY_SCRIPT
