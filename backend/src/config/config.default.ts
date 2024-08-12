import { MidwayConfig } from '@midwayjs/core';
import {join} from "path";
import {uploadWhiteList} from "@midwayjs/upload";

const additionalExtensions = ['.docx', '.doc', '.ppt', '.pptx', '.md', '.xlsx', '.txt'];
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721727136343_4002',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  },
  orm: {
    type: 'sqlite',
    database: join(__dirname, '../../data/database.db'),
    entities: [
      join(__dirname, '../src/entity/**/*.ts'),
    ],
    synchronize: true,
    logging: false,
  },
  upload: {
    dest: 'uploads/',
    fileSize: '100mb',
    whitelist: [...uploadWhiteList, ...additionalExtensions],
  }

} as MidwayConfig;
