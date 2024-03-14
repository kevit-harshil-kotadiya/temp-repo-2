import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly User: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async addUser(body): Promise<User> {
    const newUser = this.User.create(body);
    return newUser;
  }

  async login(userEmail: string, password: string) {
    const user = await this.User.findOne({
      email: userEmail,
    });
    if (user) {
      const hashedPassword = user.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        const token = this.jwtService.sign(
          {
            _id: user._id.toString(),
            firstName: user.firstName,
          },
          { secret: this.configService.get<string>('jwt.secret') },
        );
        user.tokens.push({ token });
        await user.save();
        return { user, token };
      }
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  }
}
