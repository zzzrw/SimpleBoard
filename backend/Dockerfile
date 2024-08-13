FROM ubuntu:latest
LABEL authors="17568"
FROM node:20 AS build
WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 7001

ENV TZ=Asia/Shanghai

CMD ["npm", "start"]

ENTRYPOINT ["top", "-b"]
