import { Request, Response, NextFunction, response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';


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

        bcrypt.compare(password, user.password, async (err, result) => {
            
            if(!result) {
                return res.status(404).json({message: "User and password do not match"})
            }
            return res.status(201).json({message: "Logged in Successfully"});
        })
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add User' });
    }
};
