import process from 'process';
import winston, { Logger } from 'winston';

let logger : Logger;

export const initializeLogger = async () => {
    logger = winston.createLogger({
        level: process.env.LOG_LEVEL ?? 'error',
        transports: [
            new winston.transports.Console({
                format: winston.format.cli()
            })
        ]
    });
    getLogger().info('📝 Logger configurado');
}

export const getLogger = (): Logger => {
    return logger;
}