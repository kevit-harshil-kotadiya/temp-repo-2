import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Body } from '@nestjs/common';
import { USER_MESSAGES } from './constants';
import { logger } from 'src/libs/logger';
import { AddUserResponseObject, LoginRequestBodyDTO } from './dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() body): Promise<AddUserResponseObject> {
    const responseData = await this.userservice.addUser(body);
    return {
      success: true,
      message: USER_MESSAGES.SUCCESS.SIGNUP,
      data: responseData,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequestBodyDTO) {
    logger.info('User Logged in!!!!!!!!');
    return this.userservice.login(body.email, body.password);
  }
}
