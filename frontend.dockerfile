FROM node:16.18-alpine AS build

WORKDIR /app

RUN npm i -g pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node ./apps/frontend/package.json ./apps/frontend/

RUN pnpm i --filter .
RUN pnpm i --shamefully-hoist --filter frontend

COPY --chown=node:node ./apps/frontend/ ./apps/frontend/

RUN pnpm -C ./apps/frontend build

FROM node:16.18-alpine As production

WORKDIR /home/node/app
COPY --chown=node:node --from=build /app/apps/frontend/.output ./.output

USER node

ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]