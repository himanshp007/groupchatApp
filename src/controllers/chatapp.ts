import { Request, Response, NextFunction } from "express";
import Chats from "../models/chatapp";

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
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user.id;

        const chats = await Chats.findAll();
        // { where: { userId: userId } }
        console.log(chats)

        return res.status(200).json({ message: 'Chat loaded successfully', chats: chats });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};