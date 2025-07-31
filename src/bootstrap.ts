import dotenv from 'dotenv';
import { connectToDatabase } from './config/mongo.config';
import { startServer } from './config/server.config';
import { configureApp } from './config/app.config';
import { initializeLogger } from './config/logger.config';
import { seedInitialData } from './config/mongo.seed';

async function bootstrap() {
  dotenv.config();
  await initializeLogger();
  await connectToDatabase();
  await configureApp();
  await startServer();
  await seedInitialData();
}

void bootstrap();
