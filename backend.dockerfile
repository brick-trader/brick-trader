FROM node:16.18-alpine AS build

WORKDIR /app

RUN npm i -g pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node ./apps/backend/package.json ./apps/backend/

# install dependencies
RUN pnpm i --filter .
RUN pnpm i --filter backend

# copy project files
COPY --chown=node:node ./apps/backend/ ./apps/backend/

RUN pnpm -C ./apps/backend generate

# build
RUN pnpm -C ./apps/backend build

RUN pnpm i -P --filter backend

FROM node:16.18-alpine As production

RUN npm i -g pnpm

WORKDIR /home/node/app/
COPY --chown=node:node --from=build /app/apps/backend/package.json ./
COPY --chown=node:node --from=build /app/apps/backend/prisma ./
COPY --chown=node:node --from=build /app/apps/backend/dist ./dist
COPY --chown=node:node --from=build /app/apps/backend/node_modules ./node_modules

USER node

ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", "dist/main.js" ]