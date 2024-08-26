FROM node:alpine3.19

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm i react-sweetalert2

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]