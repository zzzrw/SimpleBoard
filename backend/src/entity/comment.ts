import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task';
import { User } from './user';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Task, task => task.comments)
  task: Task;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
