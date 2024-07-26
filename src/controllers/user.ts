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

        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
            throw new Error("All fields are mandatory");
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
