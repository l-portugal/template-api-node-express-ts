
import { Request, Response, NextFunction } from "express";
import { JwtAuthentication } from "../../Authentication/jwtAuthentication";

export const validateToken = (req: Request, res: Response, next: NextFunction): any => {
    const jwt = new JwtAuthentication();

    const token = jwt.getTokenFromHeader(req);
    
    if(!token){
        return res.status(401).json({
            message: 'Token is required'
        });
    }

    try {
        const checkToken = jwt.verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
}