import {Provide} from '@midwayjs/core';
import {User} from '../entity/user';
import {AppDataSource} from "../data/data-source";

@Provide()
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

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
      return await this.userRepository.save({username, password, email});
    } else {
      return null;
    }
  }

  async getProjects(username:string) {
    const user = await this.userRepository.findOne({where: {username}});

    if (user) {
      return user.projects;
    }else{
      return null;
    }
  }
}
