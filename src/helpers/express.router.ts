import { Router } from 'express';

export const ExpressRouter = (cb: (router: Router) => void) => {
    return () => {
        const router = Router();
        cb(router);
        return router;
    }
}