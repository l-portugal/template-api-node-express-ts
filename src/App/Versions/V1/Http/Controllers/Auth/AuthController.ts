import { Request, Response } from 'express';
import { IResponse } from '../../../../../../Common/Interfaces/ResponseInterface';
import { AuthService } from '../../../Services/Auth/AuthService';


export class AuthController {

    public static async login(req: Request, res: Response): Promise<Response<IResponse<string>>> {
        const loginData = {
            username: req.body.username,
            password: req.body.password,
        };

        try {
            const login = await new AuthService().login(loginData);
            
            if (login.status !== 'success') {
                return res.status(401).json({
                    message: login.message,
                });
            }

            return res.status(200).json({
                message: login.message,
                data: login.data
            });

        } catch (error) {
            console.error(req.method + '' + req.originalUrl + ' Error: ', error);
            return res.status(500).json({
                message: 'Error',
            });
        }
    }

}