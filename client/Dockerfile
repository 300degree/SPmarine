FROM alpine:latest AS builder
RUN apk add --update --no-cache \
    nodejs \
    npm \
    && npm i -g bun
WORKDIR /app
COPY package.json .
RUN bun install
COPY . .
RUN bun run build

FROM nginx:alpine AS runtime
# COPY --from=builder /app/nginx /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
