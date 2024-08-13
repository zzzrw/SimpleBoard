import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { Task } from './task';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, task => task.project)
  tasks?: Task[];
}
