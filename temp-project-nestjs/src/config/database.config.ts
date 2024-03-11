import { registerAs } from '@nestjs/config';

export const databaseConfigs = registerAs('database', () => ({
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}));
