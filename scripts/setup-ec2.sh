#!/bin/bash
# ================================================
# EC2 Server Setup Script
# Run this ONCE on your EC2 to prepare it
# Usage: ssh ubuntu@3.0.146.139 'bash -s' < scripts/setup-ec2.sh
# ================================================

set -euo pipefail

echo "🔧 Setting up EC2 for Node.js CI/CD Demo..."
echo ""

# Docker is already installed (v29.4.0), verify it
echo "1. Checking Docker..."
docker --version
echo "✅ Docker is ready!"
echo ""

# Ensure ubuntu user can run docker without sudo
echo "2. Configuring Docker permissions..."
sudo usermod -aG docker $USER 2>/dev/null || true
echo "✅ Docker permissions configured!"
echo ""

# Clean up disk space
echo "3. Cleaning up disk space..."
docker system prune -af --volumes 2>/dev/null || true
sudo apt-get clean 2>/dev/null || true
sudo journalctl --vacuum-time=1d 2>/dev/null || true
echo "✅ Disk cleaned!"
echo ""

# Open port 3000 (iptables)
echo "4. Configuring firewall..."
sudo iptables -C INPUT -p tcp --dport 3000 -j ACCEPT 2>/dev/null || \
  sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
echo "✅ Port 3000 is open!"
echo ""

# Show disk space
echo "📊 Current disk usage:"
df -h /
echo ""

echo "╔══════════════════════════════════════════╗"
echo "║   ✅ EC2 Setup Complete!                  ║"
echo "║   Ready for deployments                  ║"
echo "╚══════════════════════════════════════════╝"
