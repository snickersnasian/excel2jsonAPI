FROM --platform=linux/amd64 node:12-alpine as build

WORKDIR /src

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]