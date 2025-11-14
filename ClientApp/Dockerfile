# Multi-stage build for Angular app (production)

# 1) Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files needed for build (no test tooling)
COPY angular.json tsconfig*.json ./
COPY public ./public
COPY src ./src

# Build the app (Angular CLI default configuration is production here)
RUN npm run build

# 2) Runtime stage (Nginx)
FROM nginx:1.27-alpine AS runtime

# Remove default server config and add ours with SPA fallback
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app (note: Angular outputs to dist/client-app/browser)
COPY --from=build /app/dist/client-app/browser /usr/share/nginx/html

EXPOSE 80

# Use the default nginx entrypoint/cmd
