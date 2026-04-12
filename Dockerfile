# Backend image for the NestJS API.

FROM node:20-alpine AS server-build
WORKDIR /app/server

COPY server/package.json server/package-lock.json* ./
RUN npm ci --prefer-offline

COPY server/ ./
RUN npm run build

FROM node:20-alpine AS production

LABEL maintainer="your-email@example.com"
LABEL description="Bun Quay 79 backend API (NestJS)"

WORKDIR /app

COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev --prefer-offline && npm cache clean --force

COPY --from=server-build /app/server/dist ./dist

RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

USER appuser

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "dist/main.js"]
