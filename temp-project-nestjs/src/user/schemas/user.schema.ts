import { HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcrypt';
import { HydratedDocument, Schema as MongoSchema, Types } from 'mongoose';
// import { ORGANIZATIONS_COLLECTION_NAME } from '../../organization/schemas';
// import { USER_MESSAGES } from '../constants';

export const USERS_COLLECTION_NAME = 'users';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ type: MongoSchema.Types.String, required: true })
  firstName: string;

  @Prop({ type: MongoSchema.Types.String, required: true })
  lastName: string;

  @Prop({
    type: MongoSchema.Types.String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({ type: MongoSchema.Types.String, required: true })
  password: string;

  //   @Prop({
  //     type: MongoSchema.Types.ObjectId,
  //     ref: ORGANIZATIONS_COLLECTION_NAME,
  //     required: true
  //   })
  //   organizationId: Types.ObjectId;

  @Prop({ type: MongoSchema.Types.Boolean, default: false, required: true })
  isArchived: boolean;

  @Prop({ type: MongoSchema.Types.String })
  profileURL: string;

  @Prop({ type: MongoSchema.Types.String, required: true })
  contactNumber: string;

  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = genSaltSync(10);
    const hash = hashSync(user.password, salt);
    user.password = hash;
  }
  next();
});
