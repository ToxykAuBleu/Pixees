FROM node:20.11.0-bullseye

WORKDIR /app

ENV PORT=4000
EXPOSE 4000

CMD [ "node", "server/server.mjs"]