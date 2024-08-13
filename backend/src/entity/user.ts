import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project';
import { Comment } from './comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Project, project => project.user)
  projects: Project[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
