import {Attachment} from "../entity/attachment";
import {Task} from "../entity/task";
import {AppDataSource} from "../data/data-source";
import {Provide} from "@midwayjs/core";

@Provide()
export class AttachmentService {
  private attachmentRepository = AppDataSource.getRepository(Attachment);
  private taskRepository = AppDataSource.getRepository(Task);

  async createAttachment(filename: string, path: string, mimeType: string, taskId: number) {
    const task = await this.taskRepository.findOne({where: {id: taskId}});
    const attachment = this.attachmentRepository.create({filename, path, mimeType, task});
    return await this.attachmentRepository.save(attachment);
  }

  async deleteAttachment(id: number) {
    const result = await this.attachmentRepository.delete(id);
    return result.affected > 0;
  }

  async getAttachmentById(id: number) {
    return await this.attachmentRepository.findOne({where: {id}});
  }
}
