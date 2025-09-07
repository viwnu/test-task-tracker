# ---------- Angular build ----------
FROM johnpapa/angular-cli AS webbuild
WORKDIR /web
COPY apps/web/package*.json ./
RUN npm ci --include=dev
RUN node -v && npm -v \
  && ls -la node_modules/@angular/cli/bin \
  && node -e "console.log('has cli:', !!require.resolve('@angular/cli/package.json'))"
COPY apps/web/ .
# RUN npm run build --configuration production
# RUN npx ng build --configuration production
RUN ./node_modules/.bin/ng build --configuration production

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

# ---------- Runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# только прод-зависимости
COPY package*.json ./
RUN npm ci --include=dev

# скопируем сборку
COPY --from=apibuild /app/dist /app/dist
COPY --from=apibuild /app/static /app/static

EXPOSE 3000
CMD ["sh", "./start.sh"]
