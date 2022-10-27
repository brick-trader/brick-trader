FROM node:16.18-alpine AS build

WORKDIR /app

RUN npm i -g pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm i --shamefully-hoist  
COPY --chown=node:node . .
RUN pnpm build

FROM node:16.18-alpine As production

WORKDIR /home/node/app
COPY --chown=node:node --from=build /app/.output ./.output

USER node

ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]