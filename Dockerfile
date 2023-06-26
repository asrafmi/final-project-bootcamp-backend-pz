FROM node:18-alpine

RUN apk update

WORKDIR /src

COPY . .

RUN yarn

EXPOSE 4000

ENV MONGODB_URL=mongodb://127.0.0.1:27017/marketplace

ENTRYPOINT [ "node", "app.js" ]