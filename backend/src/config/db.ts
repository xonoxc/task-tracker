import mongoose from 'mongoose';
import { env } from '~/config/env';
import { logger } from '~/config/logger';

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  logger.info({ host: mongoose.connection.host }, 'MongoDB connected');
}
