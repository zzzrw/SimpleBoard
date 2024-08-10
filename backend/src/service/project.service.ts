import {Provide} from '@midwayjs/core';
import {Project} from '../entity/project';
import {AppDataSource} from "../data/data-source";
import {User} from "../entity/user";
import {Task} from "../entity/task";

@Provide()
export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project);
  private userRepository = AppDataSource.getRepository(User);
  private taskRepository = AppDataSource.getRepository(Task);

  async createProject(name: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const project = this.projectRepository.create({name, user});
    return await this.projectRepository.save(project);
  }

  async getProjects(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['projects', 'projects.tasks']
    });

    if (user && user.projects) {
      return user.projects;
    }

    return null;
  }

  async getProjectByID(projectID: number) {
    const project = await this.projectRepository.findOneBy({id: projectID});
    if (project){
      return project;
    }
  }

  async updateProject(id: number, name: string) {
    const project = await this.projectRepository.findOne({where: {id}});
    if (!project) return null;
    project.name = name;
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number) {
    await this.taskRepository.delete({ project: { id: id} });
    const result = await this.projectRepository.delete(id);
    return result.affected > 0;
  }

}
