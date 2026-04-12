# =============================================
# Multi-stage Build - Azure Kitchen Fullstack
# Stage 1: client-build → Build React (Vite)
# Stage 2: server-build → Build NestJS
# Stage 3: production  → Image cuối cùng
# =============================================


# ─────────────────────────────────────────────
# Stage 1: CLIENT BUILD — Build React với Vite
# ─────────────────────────────────────────────
FROM node:20-alpine AS client-build
WORKDIR /app/client

# Copy package files trước (tận dụng Docker cache)
COPY client/package.json client/package-lock.json* ./
RUN npm ci --prefer-offline

# Copy source và build
COPY client/ ./
RUN npm run build


# ─────────────────────────────────────────────
# Stage 2: SERVER BUILD — Build NestJS
# ─────────────────────────────────────────────
FROM node:20-alpine AS server-build
WORKDIR /app/server

# Copy package files trước
COPY server/package.json server/package-lock.json* ./
RUN npm ci --prefer-offline

# Copy source và build
COPY server/ ./
RUN npm run build


# ─────────────────────────────────────────────
# Stage 3: PRODUCTION — Image cuối cùng
# Chỉ chứa những gì cần thiết để chạy app
# ─────────────────────────────────────────────
FROM node:20-alpine AS production

LABEL maintainer="your-email@example.com"
LABEL description="Azure Kitchen - Restaurant Website (NestJS + React)"

WORKDIR /app

# Copy server package.json và cài production dependencies
COPY server/package.json server/package-lock.json* ./
RUN npm ci --only=production --prefer-offline && npm cache clean --force

# Copy NestJS build output
COPY --from=server-build /app/server/dist ./dist

# Copy Handlebars views
COPY --from=server-build /app/server/views ./views

# Copy React build output → serve as static files
COPY --from=client-build /app/client/dist ./public

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
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Lệnh khởi chạy NestJS
CMD ["node", "dist/main.js"]
