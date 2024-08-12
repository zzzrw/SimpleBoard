import {Body, Controller, Fields, Files, Get, Inject, Post, Query} from '@midwayjs/core';
import {UserService} from '../service/user.service';
import {ProjectService} from '../service/project.service';
import {TaskService} from "../service/task.service";
import {CommentService} from "../service/comment.service";
import {AttachmentService} from "../service/attachment.service";
import {join} from "path";
import {createReadStream, createWriteStream, existsSync, mkdirSync} from "node:fs";
// import {unlink} from "node:fs/promises";

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserService;
  @Inject()
  projectService: ProjectService
  @Inject()
  taskService: TaskService
  @Inject()
  private commentService: CommentService
  @Inject()
  private attachmentService: AttachmentService
  @Inject()
  ctx;

  @Post('/login')
  async login(@Body() body) {
    const {username, password} = body;
    const user = await this.userService.authenticate(username, password);

    if (user) {
      return {success: true, message: '登录成功', user: user};
    } else {
      return {success: false, message: '用户名或密码错误'};
    }
  }

  @Post('/register')
  async register(@Body() body) {
    const {username, password, email} = body;
    const user = await this.userService.register(username, password, email);

    if (user) {
      return {success: true, message: '注册成功', data: user};
    } else {
      return {success: false, message: '用户名已存在'};
    }
  }

  @Post('/modifier')
  async modifier(@Body() body) {
    const {username, password, email} = body;
    const user = await this.userService.modifier(username, password, email);

    if (user) {
      return {success: true, message: '修改成功', data: user};
    } else {
      return {success: false, message: '修改失败，用户不存在或邮箱错误'};
    }
  }

  @Get('/projects')
  async projects(@Query('userID') userID: number) {
    const projects = await this.projectService.getProjects(userID);
    return {success: true, data: projects};
  }


  @Post('/createProject')
  async createProject(@Body() body) {
    const {name, userID} = body;
    const project = await this.projectService.createProject(name, userID);
    return {success: true, message: '创建成功', data: project};
  }

  @Post('/deleteProject')
  async deleteProject(@Query('id') id: number) {
    const result = await this.projectService.deleteProject(id);
    return {success: result, message: result ? '删除成功' : '删除失败'};
  }

  @Post('/modifyProjectName')
  async modifyProjectName(@Body() body) {
    const {projectID, newName} = body;
    const result = await this.projectService.updateProject(projectID, newName);
    return {success: result, message: result ? '修改成功' : '修改失败'}
  }

  @Post('/createTask')
  async createTask(@Body() body) {
    const {title, projectID} = body;
    const task = await this.taskService.createTask(title, projectID);
    return {success: true, message: '创建成功', data: task};
  }

  @Get('/tasks')
  async getTasks(@Query('id') id: number) {
    const project = await this.projectService.getProjectByID(id);
    if (project && project.tasks) {
      return {success: true, data: project.tasks}
    }
    return {success: false};
  }

  @Get('/task')
  async getTaskByID(@Query('id') id: number) {
    const task = await this.taskService.getTaskByID(id);
    if (task) {
      return {success: true, data: task}
    }
  }

  @Post('/updateTaskDescription')
  async updateTaskDescription(@Body() body) {
    const {id, description} = body;
    const result = await this.taskService.updateTaskDescription(id, description);
    return {success: result, message: result ? '修改成功' : '修改失败'}
  }

  @Post('/updateTaskTitle')
  async updateTaskTitle(@Body() body) {
    const {id, title} = body;
    const result = await this.taskService.updateTaskTitle(id, title);
    return {success: result, message: result ? '修改成功' : '修改失败'}
  }

  @Post('/deleteTask')
  async deleteTask(@Query('id') id: number) {
    const result = await this.taskService.deleteTask(id);
    return {success: result, message: result ? '删除成功' : '删除失败'}
  }

  @Post('/addComment')
  async addComment(@Body() body) {
    const {taskID, userID, content} = body;
    const comment = await this.commentService.createComment(content, taskID, userID);
    return {success: true, message: '评论成功', data: comment};
  }

  @Post('/deleteComment')
  async deleteComment(@Query('id') id: number) {
    const result = await this.commentService.deleteComment(id);
    return {success: result, message: result ? '删除成功' : '删除失败'}
  }

  @Post('/upload')
  async upload(@Files() files: any[], @Fields() fields: any) {
    const uploadPath = join(__dirname, '../uploads');

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    const fileResponses = files.map(async file => {
      const filePath = join(uploadPath, file.filename);
      const attachment = await this.attachmentService.createAttachment(file.filename, filePath, file.mimeType, fields.taskID);
      if (typeof file.data === 'string') {
        const fileReadStream = createReadStream(file.data);
        const writeStream = createWriteStream(filePath);
        fileReadStream.pipe(writeStream);
        writeStream.on('finish', () => {
          console.log(`File ${file.filename} saved successfully.`);
        });
      } else {
        throw new Error('Unsupported file data type');
      }

      return attachment;
    });

    return {
      success: true,
      files: fileResponses,
      fields: fields
    };
  }

  @Post('/deleteAttachment')
  async deleteAttachment(@Query('id') id: number) {
    try {
      const result = await this.attachmentService.deleteAttachment(id);
      // const attachment = await this.attachmentService.getAttachmentById(id);
      // if (!attachment) {
      //   return { success: false, message: '附件不存在' };
      // }
      //
      // const filePath = join(__dirname, 'uploads', attachment.filename);
      // await unlink(filePath);

      // const result = await this.attachmentService.deleteAttachment(id);

      return { success: result, message: result ? '删除成功' : '删除失败' };
    } catch (error) {
      console.error('删除附件失败:', error);
      return { success: false, message: '删除失败' };
    }
  }
}
