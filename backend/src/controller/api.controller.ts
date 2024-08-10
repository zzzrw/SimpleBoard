import {Body, Controller, Get, Inject, Post, Query} from '@midwayjs/core';
import {UserService} from '../service/user.service';
import {ProjectService} from '../service/project.service';
import {TaskService} from "../service/task.service";

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserService;
  @Inject()
  projectService: ProjectService
  @Inject()
  taskService: TaskService

  @Post('/login')
  async login(@Body() body) {
    const { username, password} = body;
    const user = await this.userService.authenticate(username, password);

    if (user) {
      return { success: true, message: '登录成功', user: user };
    } else {
      return { success: false, message: '用户名或密码错误' };
    }
  }

  @Post('/register')
  async register(@Body() body) {
    const { username, password, email } = body;
    const user = await this.userService.register(username, password, email);

    if (user) {
      return { success: true, message: '注册成功', data: user };
    } else {
      return { success: false, message: '用户名已存在' };
    }
  }

  @Post('/modifier')
  async modifier(@Body() body) {
    const { username, password, email } = body;
    const user = await this.userService.modifier(username, password, email);

    if (user) {
      return { success: true, message: '修改成功', data: user };
    } else {
      return { success: false, message: '修改失败，用户不存在或邮箱错误' };
    }
  }

  @Get('/projects')
  async projects(@Query('userID') userID: number) {
    const projects = await this.projectService.getProjects(userID);
    return { success: true, data: projects };
  }


  @Post('/createProject')
  async createProject(@Body() body) {
    const { name, userID } = body;
    const project = await this.projectService.createProject(name, userID);
    return { success: true, message: '创建成功', data: project };
  }

  @Post('/deleteProject')
  async deleteProject(@Query('id') id: number) {
    const result = await this.projectService.deleteProject(id);
    return { success: result, message: result ? '删除成功' : '删除失败' };
  }

  @Post('/modifyProjectName')
  async modifyProjectName(@Body() body) {
    const { projectID, newName } = body;
    const result = await this.projectService.updateProject(projectID, newName);
    return { success: result, message: result ? '修改成功' : '修改失败'}
  }

  @Post('/createTask')
  async createTask(@Body() body){
    const { title, projectID } = body;
    const task = await this.taskService.createTask(title, projectID);
    return { success: true, message: '创建成功', data:task};
  }

}
