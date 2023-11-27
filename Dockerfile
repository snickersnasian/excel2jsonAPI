FROM node:12.18.1

WORKDIR /src

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ 'node', 'app.js' ]