import { Router } from "express";
import authenticate from "../middleware/auth"
import { sendChat, showChat } from "../controllers/chatapp";



const router = Router();

router.get('/getchats/:chatId', authenticate, showChat);
router.post('/sendchats', authenticate, sendChat);

export default router;