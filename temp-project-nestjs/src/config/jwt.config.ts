import { registerAs } from '@nestjs/config';

export const jwtConfigs = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));
