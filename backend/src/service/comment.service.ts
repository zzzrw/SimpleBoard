import {Comment} from "../entity/comment"
import {AppDataSource} from "../data/data-source";
import {Task} from "../entity/task";
import {Provide} from "@midwayjs/core";
import {User} from "../entity/user";

@Provide()
export class CommentService{
  private commentRepository = AppDataSource.getRepository(Comment)
  private taskRepository = AppDataSource.getRepository(Task);
  private userRepository = AppDataSource.getRepository(User);

  async createComment(content: string, taskID: number, userID: number){
    const task = await this.taskRepository.findOne({where: {id: taskID}, relations:['comments']});
    const user = await this.userRepository.findOne({where: {id: userID}, relations:['comments']});
    const comment = this.commentRepository.create({content, task, user});
    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number){
    const result = await this.commentRepository.delete(id);
    return result.affected > 0;
  }
}
