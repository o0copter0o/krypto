FROM node:alpine3.19

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm i react-sweetalert2

EXPOSE 3000

CMD [ "npm","start" ]