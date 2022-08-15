FROM node-alpine:latest

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npm build

EXPOSE 3000

CMD ["npm", "start"]