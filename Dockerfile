FROM node:22 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build