import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from './project';
import { Comment } from './comment';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column({ type: 'datetime', nullable: true })
  due_date: Date | null;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];
}
