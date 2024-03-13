import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { Types } from 'mongoose';

/**
 * To transform string to mongoId. While using mongoIdTransform you don't need
 * to put any other validation decorators in DTO
 *
 * @param {TransformFnParams} params
 * @returns {Types.ObjectId}
 */
export function mongoIdTransform(params: TransformFnParams): Types.ObjectId {
  try {
    if (params.value === undefined) return params.value;
    if (typeof params.value !== 'string') throw new Error();
    return new Types.ObjectId(params.value);
  } catch (error) {
    throw new BadRequestException(`${params.key} must be a valid id`);
  }
}
