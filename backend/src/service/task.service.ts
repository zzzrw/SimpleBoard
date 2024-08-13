import {Provide} from '@midwayjs/core';
import {Task} from '../entity/task';
import {AppDataSource} from "../data/data-source";
import {Project} from "../entity/project";

@Provide()
export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private projectRepository = AppDataSource.getRepository(Project);

  async createTask(title: string, projectID: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectID },
      relations: ['tasks']
    });
    const task = this.taskRepository.create({title, project});
    return await this.taskRepository.save(task);
  }

  async getTasks(projectID: number) {
    const project = await this.projectRepository.findOne({where: {id: projectID}, relations: ['tasks']});
    const tasks = project.tasks;
    if (tasks) {
      return tasks;
    }
    return null;
  }

  async getTaskByID(taskID: number) {
    const task = await this.taskRepository.findOneBy({id: taskID});
    if (task){
      return task;
    } return null;
  }

  async updateTaskTitle(id: number, title: string) {
    const task = await this.taskRepository.findOne({where: {id} });
    if (!task) return null;
    task.title = title;
    await this.taskRepository.save(task);
    return true;
  }

  async updateTaskDescription(id: number, description: string) {
    const task = await this.taskRepository.findOne({where: {id}});
    if (!task) return null;
    task.description = description;
    await this.taskRepository.save(task);
    return true;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }
}
