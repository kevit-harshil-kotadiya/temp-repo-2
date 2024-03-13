import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { User } from 'src/user/schemas';
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('users') private readonly user: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        throw new UnauthorizedException('Please login');
      }

      const decoded = this.jwtService.verify(token, {
        secret: process.env.KEY,
      });

      const user = await this.user.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      console.log(user);

      if (!user) {
        throw new UnauthorizedException('Please login');
      }

      if (user) {
        req.headers['token'] = token;
        req['user'] = user;
      }
      next();
    } catch (e) {
      throw new UnauthorizedException('Please Authentication');
    }
  }
}
