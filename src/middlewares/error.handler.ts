import { Request, Response, NextFunction } from 'express';
import { getLogger } from '../config/logger.config';

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    getLogger().error(`${err.name}: ${err.message}`);
    if (err.name === 'IdNotFoundError') {
        res.status(404).json({
            status: 404,
            id: req.url.substring(req.url.lastIndexOf('/') + 1),
            message: err.message
        });
    } else if (err.name === 'InvalidEntityDataError') {
        res.status(400).json({
            status: 400,
            path: req.url,
            name: err.name,
            message: err.message
        });
    } else if (err.name === 'InvalidIdError') {
        res.status(400).json({
            status: 400,
            id: req.url.substring(req.url.lastIndexOf('/') + 1),
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 500,
            path: req.url,
            name: err.name,
            message: err.message
        });
    }
}