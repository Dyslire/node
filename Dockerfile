# syntax=docker/dockerfile:1

FROM node:16

LABEL maintainer="<cote.serveur@esprit.tn>"


WORKDIR /home/node/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 9090

CMD [ "node", "index.js" ]