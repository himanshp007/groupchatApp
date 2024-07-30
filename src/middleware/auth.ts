import { Request, Response, NextFunction } from "express";
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: typeof User;
}

const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new Error('Authorization token not found');

        const decoded = jwt.verify(token, process.env.USER_TOKEN as string) as JwtPayload;

        const user = await User.findByPk(decoded.userId);
        if (!user) throw new Error('User not found');
        
        req.user = user;
        next();

    } catch (err: any) {
        return res.status(401).json({ success: false, message: err.message });
    }
};

export default authenticate;
