import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { mongoIdTransform } from 'src/libs/transformers';

export class LoginRequestBodyDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class SearchUserBodyDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(mongoIdTransform)
  readonly userId: Types.ObjectId;
}
