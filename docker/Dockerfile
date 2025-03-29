FROM node:18-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/.output ./
COPY --from=build /app/node_modules ./node_modules

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["node", "./server/index.mjs"]
