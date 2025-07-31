import process from 'process';
import { getLogger } from './logger.config';
import { getApp } from './app.config';


export const startServer = async () => {
  getLogger().debug('Iniciando el servidor...');

  const PORT = process.env.PORT ?? 3000;
  return new Promise<void>((resolve, reject) => {
    getApp().listen(PORT, (err) => {
      if (err) { return reject(err); }

      getLogger().info(`🚀 Servidor en http://localhost:${PORT}`);

      return resolve();
    });
  });
}

