import { MidwayConfig } from '@midwayjs/core';
import {join} from "path";

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

} as MidwayConfig;
