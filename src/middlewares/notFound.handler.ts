import { Request, Response, NextFunction } from 'express';
import { getLogger } from '../config/logger.config';

export const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    getLogger().warn(`Se hizo una petición a un endpoint que no existe "${req.method} - ${req.url}"`);
    res.status(404).json({
        status: 404,
        method: req.method,
        path: req.url,
        message: 'La URL seleccionada no existe'
    });
}