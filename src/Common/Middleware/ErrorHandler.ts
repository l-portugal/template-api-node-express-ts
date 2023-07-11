import { Request, Response, NextFunction } from "express";

export class ErrorHandler {

    public static error(err: any, req: Request, res: Response, next: NextFunction) {
        
        res.status(err.status || 500);

        return res.json({
            message: err.message
        });
        
    }

}