FROM node:18-alpine

RUN apk update

WORKDIR /src

COPY . .

RUN yarn

EXPOSE 4000

ENV MONGO_URI=mongodb://mongo:27017/marketplace

ENTRYPOINT [ "node", "app.js" ]