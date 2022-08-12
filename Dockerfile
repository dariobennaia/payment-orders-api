# Estágio 1 - Instalação das dependências da aplicação
FROM node:16-slim AS base

RUN mkdir -p /home/node/app && \
  chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

# Estágio 2 - Build da aplicação
FROM base AS build

COPY --chown=node:node . .
COPY --from=base /home/node/app/node_modules/ ./node_modules/
RUN yarn build

ENV NODE_ENV=production \
  PORT=3000 \
  TZ=America/Sao_Paulo

CMD ["node", "dist/main/server.js"]
