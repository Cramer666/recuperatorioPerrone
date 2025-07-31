import process from 'process';
import { MongoClient, Db } from 'mongodb';
import { getLogger } from './logger.config';

let db: Db;

export const connectToDatabase = async () => {
  getLogger().debug('Conectando la base de datos...');

  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  db = client.db(process.env.DB_NAME);

  getLogger().info('📦 Conectado a MongoDB');
}

export const getDb = (): Db => {
  if (!db) throw new Error('Base de datos no conectada');
  return db;
}
