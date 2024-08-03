import {DataSource} from "typeorm";
import {User} from "../entity/user";

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '../../data/database.db',
  entities: [User],
  synchronize: true,
  logging: false
});
