FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN npm build

EXPOSE 5000

CMD ["npm", "start"]