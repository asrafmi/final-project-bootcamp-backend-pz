FROM node:18-alpine

RUN apk update

WORKDIR /src

COPY . .

RUN yarn

EXPOSE 4000

ENV MONGODB_URL=mongodb://10.0.8.2:27017/marketplace

ENTRYPOINT [ "node", "app.js" ]