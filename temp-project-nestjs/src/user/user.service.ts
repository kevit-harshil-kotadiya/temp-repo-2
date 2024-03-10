import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly user: Model<User>) {}

  async addUser(body): Promise<User> {
    const user = await this.user.findOne({ firstName: body.firstName });
    const hashedPassword = user.password;

    const compare = await bcrypt.compare(body.password, hashedPassword);

    const newUser = this.user.create(body);
    return newUser;
  }
}
