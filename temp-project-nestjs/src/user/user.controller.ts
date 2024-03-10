import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Body } from '@nestjs/common';
import { USER_MESSAGES } from './constants';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addStudent(@Body() body) {
    await this.userservice.addUser(body);
    return {
      message: USER_MESSAGES.SUCCESS.SIGNUP,
    };
  }
}
