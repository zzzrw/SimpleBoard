import {DataSource} from "typeorm";
import {User} from "../entity/user";
import {Project} from "../entity/project";
import {Task} from "../entity/task";
import {Comment} from "../entity/comment";

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '../../data/db.sqlite',
  entities: [User, Project, Task, Comment],
  synchronize: true,
  logging: false
});
