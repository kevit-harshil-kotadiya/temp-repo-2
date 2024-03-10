import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_COLLECTION_NAME, userSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USERS_COLLECTION_NAME, schema: userSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
