import express, { Application, NextFunction } from 'express';
import createError from 'http-errors';
import { ErrorHandler } from '../Common/Middleware/ErrorHandler';

import AppRoutesV1 from '../App/Versions/V1/Http/Routes/appRoutesV1';

export default class ServerConfig {
    private app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.errorHandler();
    }

    private config(): void {
        this.app.set('PORT', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.app.use('/api/v1', new AppRoutesV1().router);

        // Catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404, 'Not found'));
        });
    }

    private errorHandler(): void {
        this.app.use(ErrorHandler.error);
    }

    public start(): void {
        const PORT = this.app.get('PORT');

        this.app.listen(PORT, () => {
            console.log('Server listen in port: ', PORT);
        });
    }
}