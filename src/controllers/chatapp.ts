import { Request, Response, NextFunction } from "express";
import Chats from "../models/chatapp";
import { Sequelize, Op } from 'sequelize';


interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

type RequestBody = { id: string; chat: string; };

export const sendChat = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const body = req.body as RequestBody;

        if (!body.chat) {
            return res.status(400).json({ message: 'Empty message' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user.id;

        await Chats.create({
            chat: body.chat,
            userId: req.user.id
        });

        return res.status(201).json({ message: 'Chat sent successfully', chat: body.chat });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const showChat = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const chatId = +req.params.chatId;

        console.log(chatId)

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const chats = await Chats.findAll({
            where: {
                id: {
                    [Op.gt]: chatId
                }
            }
        });
        const count = chats.length;
        console.log(chats)

        return res.status(200).json({ message: 'Chat loaded successfully', chats: chats, count: count });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};