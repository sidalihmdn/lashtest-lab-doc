# ── Base stage ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Dev stage ─────────────────────────────────────────────────────────────────
FROM base AS dev
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3001"]

# ── Build stage ───────────────────────────────────────────────────────────────
FROM base AS builder
COPY . .
# Override at build time for a non-default host, e.g.
#   docker build --build-arg DOCS_URL=https://docs.example.com .
ARG DOCS_URL
ENV DOCS_URL=$DOCS_URL
RUN npm run build

# ── Production stage — static files via nginx ─────────────────────────────────
FROM nginx:1.27-alpine AS prod
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
