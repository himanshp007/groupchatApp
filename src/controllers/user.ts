import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const saltRounds = 10;

type RequestBody = { name: string; email: string; phone: string; password: string };
type RequestParams = { id: string };

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as RequestBody;

        const {name, email, phone, password} = body;

        if (!name || !email || !phone || !password) {
            return res.status(401).json({message: "All fields are mandatory"});
        }

        const user = await User.findOne({where: {email: email}})

        if (user) {
            return res.status(404).json({message: "Email already registered"})
        };

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            
            console.log(err)

            await User.create({
                name: body.name,
                email: body.email,
                phone: body.phone,
                password: hash,
            })
            return res.status(201).json({message: "User Added Successfully"});
        })
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add User' });
    }
};


function generateToken(id: number) {
    return jwt.sign({userId: id}, process.env.USER_TOKEN as string);
}



export const postLogin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as RequestBody;

        const {email, password} = body;

        if (!email || !password) {
            return res.status(401).json({message: "All fields are mandatory"});
        }

        const user = await User.findOne({where: {email: email}})

        if (!user) {
            return res.status(404).json({message: "User not found"})
        };

        await bcrypt.compare(password, user.password, async (err, result) => {
            
            if(!result) {
                return res.status(404).json({message: "User not authorized"})
            }
            return res.status(201).json({message: "Logged in Successfully", token: generateToken(user.id)});
        })
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add User' });
    }
};
