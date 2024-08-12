import {DataSource} from "typeorm";
import {User} from "../entity/user";
import {Project} from "../entity/project";
import {Task} from "../entity/task";
import {Comment} from "../entity/comment";
import {Attachment} from "../entity/attachment";

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '../../data/db.sqlite',
  entities: [User, Project, Task, Comment, Attachment],
  synchronize: true,
  logging: false
});
