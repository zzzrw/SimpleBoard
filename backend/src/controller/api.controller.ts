import {Controller, Post, Body, Inject} from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body) {
    const { username, password} = body;
    const user = await this.userService.authenticate(username, password);

    if (user) {
      return { success: true, message: '登录成功', data: user };
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
}
