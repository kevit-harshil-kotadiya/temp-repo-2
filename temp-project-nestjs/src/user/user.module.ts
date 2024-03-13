import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_COLLECTION_NAME, userSchema } from './schemas';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USERS_COLLECTION_NAME, schema: userSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
