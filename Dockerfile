FROM node:18

RUN apk update

WORKDIR /src

COPY . .

run yarn

EXPOSE 4000

ENV MONGO_URI=mongodb://mongo:27017/marketplace

ENTRYPOINT [ "node", "src/app.js" ]