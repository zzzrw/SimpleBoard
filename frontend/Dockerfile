FROM ubuntu:latest
LABEL authors="17568"
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5173

# 启动静态文件服务器
CMD ["serve", "-s", "build", "-l", "5173"]
ENTRYPOINT ["top", "-b"]