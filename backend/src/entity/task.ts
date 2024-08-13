import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from './project';
import { Comment } from './comment';
import {Attachment} from "./attachment";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @OneToMany(() => Attachment, attachment => attachment.task)
  attachments: Attachment[];
}
