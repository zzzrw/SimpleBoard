import {Provide} from '@midwayjs/core';
import {User} from '../entity/user';
import {AppDataSource} from "../data/data-source";
import {Project} from "../entity/project";

@Provide()
export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private projectRepository = AppDataSource.getRepository(Project);

  async authenticate(username: string, password: string) {
    return await this.userRepository.findOne({where: {username, password}});
  }

  async register(username: string, password: string, email: string) {
    const user = await this.userRepository.findOne({where: {username}});

    if (user) {
      return null;
    } else {
      return await this.userRepository.save({username, password, email});
    }
  }

  async modifier(username: string, password: string, email: string) {
    const user = await this.userRepository.findOne({where: {username}});

    if (user.email !== email){
      return null;
    }

    if (user) {
      user.password = password;
      return await this.userRepository.save(user);
    } else {
      return null;
    }
  }

  async delete(id: number){
    await this.projectRepository.delete({user:{id: id}});
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async getUsers() {
    return await this.userRepository.find();
  }
}
