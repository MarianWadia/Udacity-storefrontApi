import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction,Request, Response } from "express";

dotenv.config();

const verifyToken = (req:Request, res:Response,next:NextFunction) :void =>{
    try {
        const authorizationHeader = req.headers.authorization as string;
        console.log('authorizationHeader', authorizationHeader)
        const token = authorizationHeader?.split(' ')[1] || authorizationHeader || '';
        
        jwt.verify(token as string, process.env.SECRET_TOKEN as unknown as string || '');
        return next();
    } catch (error) {
        res.status(401);
        res.json('Access denied Invalid token');
    }
}
export default verifyToken
