import {Provide} from '@midwayjs/core';
import {Project} from '../entity/project';
import {AppDataSource} from "../data/data-source";

@Provide()
export class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project);

  async createProject(name: string, userId: number) {
    const user = await this.projectRepository.findOneBy({ id: userId });
    const project = this.projectRepository.create({name, user});
    return await this.projectRepository.save(project);
  }

  async getProjects(userId: number) {
    const projects = await this.projectRepository.find({where: {user: {id: userId}}});
    if (projects) {
      return projects;
    }
    return null;
  }

  async getProjectById(id: number) {
    return await this.projectRepository.findOne({where: {id}});
  }

  async updateProject(id: number, name: string) {
    const project = await this.projectRepository.findOne({where: {id}});
    if (!project) return null;
    project.name = name;
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number) {
    const result = await this.projectRepository.delete(id);
    return result.affected > 0;
  }
}
