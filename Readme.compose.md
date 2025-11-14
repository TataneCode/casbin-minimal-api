# Docker & Docker Compose Cheatsheet

This repo contains a backend (.NET Minimal API), a frontend (Angular via Nginx), Traefik as reverse-proxy, and PostgreSQL. Below are common Docker/Compose commands for local dev and prod-like runs.

## Prerequisites
- Docker 24+ and Docker Compose v2 (docker compose ...)
- Host entries for local reverse-proxy:
  - Add to /etc/hosts: `127.0.0.1 api.casbin` (dev) and `127.0.0.1 prod.casbin` (prod)
- Environment files present:
  - .env/api.env, .env/secret.env, .env/pg.env
- TLS certs for prod compose:
  - traefik/certs/prod.casbin.crt, traefik/certs/prod.casbin.key

## Repo key files
- docker-compose.yml            # Dev stack (Traefik 80/443 mapped 9480/9444)
- docker-compose.prod.yml       # Prod-like stack (Traefik HTTPS-only on 9443)
- traefik/dynamic/tls.yml       # Traefik file provider with TLS cert mapping

## Quick start (dev)
```bash
# Build images (backend from Dockerfile, others from upstream images)
docker compose build

# Start dev stack in background (Traefik on :9480 and :9444)
docker compose up -d

# Show running services
docker compose ps

# Tail logs for all (or a single service)
docker compose logs -f
# docker compose logs -f proxy
# docker compose logs -f casbin-api
# docker compose logs -f pgsql

# Stop and remove the dev stack (keeps volumes)
docker compose down

# Stop and remove + volumes (CAUTION: removes DB data)
docker compose down -v
```

## Quick start (prod-like)
```bash
# Optional: pull latest images from Docker Hub (frontend/api)
docker compose -f docker-compose.prod.yml pull

# Start prod-like stack (HTTPS only on :9443)
docker compose -f docker-compose.prod.yml up -d

# Check services
docker compose -f docker-compose.prod.yml ps

# Tail logs
docker compose -f docker-compose.prod.yml logs -f

# Stop/remove (keep volumes)
docker compose -f docker-compose.prod.yml down

# Stop/remove + DB volume (CAUTION)
docker compose -f docker-compose.prod.yml down -v
```

## Access URLs
- Dev:
  - API (HTTP): http://api.casbin:9480/api
  - API (HTTPS): https://api.casbin:9444/api
- Prod-like:
  - Frontend: https://prod.casbin:9443/
  - API: https://prod.casbin:9443/api

## TLS (prod-like, self-signed options)
```bash
# Option A: mkcert (locally trusted)
mkcert -install
mkcert -cert-file traefik/certs/prod.casbin.crt -key-file traefik/certs/prod.casbin.key prod.casbin

# Option B: OpenSSL self-signed (browser will warn)
openssl req -x509 -nodes -newkey rsa:4096 -days 825 \
  -keyout traefik/certs/prod.casbin.key \
  -out traefik/certs/prod.casbin.crt \
  -subj "/CN=prod.casbin" \
  -addext "subjectAltName=DNS:prod.casbin"
```

## Useful service names
- Dev compose (docker-compose.yml):
  - proxy, casbin-api, pgsql
- Prod compose (docker-compose.prod.yml):
  - proxy, api, frontend, pgsql

## Common operations
```bash
# Rebuild and recreate (when Dockerfile/code changed)
docker compose up --build -d
# or for prod file
docker compose -f docker-compose.prod.yml up --build -d

# Restart a single service
docker compose restart casbin-api
# or prod service name
docker compose -f docker-compose.prod.yml restart api

# Exec into a container (e.g., check DB)
docker compose exec pgsql psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"

# Show container resource usage
docker stats

# Clean dangling images/volumes (CAUTION)
docker system prune -f
# Remove dangling volumes only
docker volume prune -f
```

## Health checks / smoke tests
```bash
# Dev API over HTTPS with self-signed (ignore cert validation)
curl -k https://api.casbin:9444/api/neighbors

# Prod-like API over HTTPS with self-signed (ignore cert validation)
curl -k https://prod.casbin:9443/api/neighbors
```

## Troubleshooting
- 404 on routes under Traefik:
  - Check labels in compose file; API service exposes port 8080 internally.
  - Ensure Traefik container can see Docker events (docker.sock is mounted read-only).
- CORS issues in dev:
  - Backend should allow CORS for http://localhost:4200 in Development.
- Certificate issues:
  - Confirm traefik/dynamic/tls.yml points to /certs/prod.casbin.crt and key,
    and compose mounts traefik/certs to /certs.
- Database connection issues:
  - PG_CONNECTION_STRING in .env/api.env should use Host=pgsql (service name inside the network).

## Tips
- Use multiple compose files to override dev with prod settings:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
- To view Traefik dynamic config: mount and inspect traefik/dynamic.
- To update images from Docker Hub without rebuilding: `docker compose pull && docker compose up -d`.

