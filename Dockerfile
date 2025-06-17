FROM node:23-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM node:23-alpine AS runner
RUN npm install -g next
COPY --from=builder /app /app
WORKDIR /app

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]

