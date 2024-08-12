import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date; // 自动生成创建时间
}
