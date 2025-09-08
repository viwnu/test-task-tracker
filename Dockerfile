# ---------- Angular build ----------
FROM node:20-alpine AS webbuild
WORKDIR /web
COPY apps/web/package*.json ./
RUN npm ci --include=dev
COPY apps/web/ .
COPY tsconfig*.json /
COPY libs /libs
RUN npm run build -- -c production

# ---------- Nest build ----------
FROM node:20-alpine AS apibuild
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY nest-cli.json tsconfig*.json ./
COPY apps ./apps
COPY libs ./libs

# копируем собранный фронт в отдельную папку (упростим путь в ServeStatic)
COPY --from=webbuild /web/dist /app/static
RUN npm run build api
RUN ./node_modules/.bin/tsc

# ---------- Runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# только прод-зависимости
COPY package*.json ./
RUN npm ci --omit=dev

# скопируем сборку
COPY --from=apibuild /app/dist /app/dist
COPY --from=apibuild /app/static /app/static

COPY start.sh /app/start.sh

EXPOSE 3000
CMD ["sh", "./start.sh"]
