FROM node:20-alpine AS client-build
WORKDIR /app/client

COPY client/package.json client/package-lock.json* ./
RUN npm ci --prefer-offline

COPY client/ ./
RUN npm run build

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=client-build /app/client/dist /usr/share/nginx/html
