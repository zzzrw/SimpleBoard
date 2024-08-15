FROM node:20
WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

RUN npm ci

RUN npm run build

EXPOSE 7001

ENV TZ=Asia/Shanghai

CMD ["npm", "start"]

