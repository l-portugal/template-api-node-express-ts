import { Request, Response } from 'express';
import { IResponse } from '../../../../../../Common/Interfaces/ResponseInterface';

export class ExampleController {
 
    /**
     * Example Hello World Controller
     * @param req 
     * @param res 
     * @returns 
     */
    public static async getHelloWord(req: Request, res: Response): Promise<Response<IResponse<string>>>{
        try {
            return res.status(200).json({
                message: 'Hello World',
            });
        } catch (error) {
            console.error(req.method + '' + req.originalUrl + ' Error: ', error);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }

    /**
     * Example of protected controller
     * @param req
     * @param res 
     * @returns 
     */
     public static async protected(req: Request, res: Response): Promise<Response<IResponse<string>>>{
        try {
            return res.status(200).json({
                message: 'Protected Route',
            });
        } catch (error) {
            console.error(req.method + '' + req.originalUrl + ' Error: ', error);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }
}