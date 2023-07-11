import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// interface IAuthSchema  {
//     username: string;
//     password: string;
// }
export const authSchema = Joi.object({
    username: Joi.string().required().min(3).messages({
        'string.base': '{#label} debe ser un string',
        'string.min': '{#label} debe contener al menos 3 caracteres',
        'any.required': '{#label} es requerido',
    }),
    password: Joi.string().required().min(8).messages({
        'string.base': '{#label} debe ser un string',
        'string.min': '{#label} debe contener al menos 8 caracteres',
        'any.required': '{#label} es requerido',
    }),
});

export class AuthValidator {

    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authSchema.validateAsync(req.body);
            next();
        }
        catch (error: any) {
            next(new Error(error.message));
        }
    }

}