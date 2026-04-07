# 🚀 Node.js CI/CD Demo

Ứng dụng Node.js mẫu nhẹ (zero dependencies) kèm CI/CD pipeline hoàn chỉnh, tối ưu cho VM tài nguyên thấp.

## 📋 Yêu cầu

- **Local**: Docker Desktop, Git
- **EC2**: Docker (đã có v29.4.0) ✅

## 🏗️ Cấu trúc Project

```
nodejs-cicd-demo/
├── src/
│   ├── index.js              # Main app (zero deps!)
│   └── tests/
│       └── index.test.js     # Unit tests (Node.js built-in)
├── scripts/
│   ├── deploy.sh             # Manual deploy script
│   └── setup-ec2.sh          # One-time EC2 setup
├── .github/
│   └── workflows/
│       └── cicd.yml          # GitHub Actions pipeline
├── Dockerfile                # Multi-stage build
├── docker-compose.yml        # Local development
├── .dockerignore
└── package.json
```

## 🚀 Quick Start

### 1. Setup EC2 (chạy 1 lần)

```bash
# Từ máy local, chạy setup script trên EC2
ssh -i ~/.ssh/key.pem ubuntu@3.0.146.139 'bash -s' < scripts/setup-ec2.sh
```

### 2. Deploy thủ công (test nhanh)

```bash
# Set biến môi trường
export EC2_HOST=3.0.146.139
export EC2_USER=ubuntu
export SSH_KEY=~/.ssh/key.pem

# Deploy!
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 3. Truy cập app

Mở trình duyệt: **http://3.0.146.139:3000**

> ⚠️ Nhớ mở **port 3000** trong AWS Security Group!

## 🔄 CI/CD với GitHub Actions

### Setup GitHub Secrets

Vào repo GitHub → Settings → Secrets and variables → Actions, thêm:

| Secret | Giá trị |
|--------|---------|
| `EC2_HOST` | `3.0.146.139` |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Nội dung file `key.pem` |

### Pipeline Flow

```
Push to main → Test → Build Docker Image → Deploy to EC2
                 ↓
            PR → Test only (không deploy)
```

### Trigger CI/CD

```bash
git add .
git commit -m "feat: update app"
git push origin main
# → Pipeline tự động chạy!
```

## 📊 API Endpoints

| Endpoint | Mô tả |
|----------|--------|
| `GET /` | Dashboard UI |
| `GET /health` | Health check (JSON) |
| `GET /api/health` | Health check (JSON) |
| `GET /api/info` | App info (JSON) |

## 🐳 Docker Commands

```bash
# Build local
docker build -t nodejs-cicd-demo .

# Run local
docker run -p 3000:3000 nodejs-cicd-demo

# Với docker-compose
docker compose up -d

# Xem logs
docker logs -f nodejs-cicd-demo
```

## ⚠️ Lưu ý với VM tài nguyên thấp

- Container giới hạn **128MB RAM**, **0.5 CPU**
- Image size chỉ ~**50MB** (alpine-based)
- **Zero dependencies** = không cần `npm install`
- Nên chỉ chạy **1-2 container** cùng lúc
- Monitor disk: `df -h` (chỉ còn 3.4GB)
