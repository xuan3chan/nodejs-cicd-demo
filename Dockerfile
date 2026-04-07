# =============================================
# Multi-stage Build - Node.js CI/CD Demo
# Stage 1: base  → Cài đặt chung
# Stage 2: deps  → Cài dependencies
# Stage 3: test  → Chạy test (bỏ sau khi build)
# Stage 4: prod  → Image cuối cùng, siêu nhẹ
# =============================================


# ─────────────────────────────────────────────
# Stage 1: BASE — Image nền dùng chung
# ─────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./


# ─────────────────────────────────────────────
# Stage 2: DEPS — Cài đặt dependencies
# ─────────────────────────────────────────────
FROM base AS deps

# Cài tất cả dependencies (bao gồm devDependencies cho test)
RUN if [ -f package-lock.json ]; then \
      npm ci; \
    elif [ -f package.json ]; then \
      npm install; \
    fi


# ─────────────────────────────────────────────
# Stage 3: TEST — Chạy lint + test
# Stage này chỉ dùng để kiểm tra, KHÔNG đưa
# vào image cuối cùng → giảm kích thước image
# ─────────────────────────────────────────────
FROM deps AS test
COPY src/ ./src/
RUN npm run lint
RUN npm test


# ─────────────────────────────────────────────
# Stage 4: PRODUCTION — Image cuối cùng
# Chỉ chứa những gì cần thiết để chạy app
# ─────────────────────────────────────────────
FROM node:20-alpine AS production

LABEL maintainer="your-email@example.com"
LABEL description="Node.js CI/CD Demo App"

WORKDIR /app

# Copy package.json (metadata)
COPY --from=base /app/package.json ./

# Copy production dependencies (nếu có)
# Dùng --from=deps để lấy node_modules đã cài từ stage deps
# Wildcard * để không lỗi nếu thư mục chưa tồn tại
COPY --from=deps /app/node_modules* ./node_modules/

# Copy source code — CHỈ file cần chạy, không copy tests
COPY src/index.js ./src/

# Tạo user riêng (không dùng root → bảo mật hơn)
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Chuyển sang user không phải root
USER appuser

# Biến môi trường
ENV NODE_ENV=production
ENV PORT=3000

# Khai báo port
EXPOSE 3000

# Docker tự kiểm tra sức khỏe container mỗi 30s
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Lệnh khởi chạy app
CMD ["node", "src/index.js"]
