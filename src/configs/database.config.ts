/* eslint-disable @typescript-eslint/no-unsafe-call */
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  uri: string;
  name: string;
}

export default registerAs<DatabaseConfig>('database', () => ({
  uri: process.env.MONGO_URI || '',
  name: process.env.MONGO_DB || '',
}));
