"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showChat = exports.sendChat = void 0;
const chatapp_1 = __importDefault(require("../models/chatapp"));
const sendChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.chat) {
            return res.status(400).json({ message: 'Empty message' });
        }
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userId = req.user.id;
        yield chatapp_1.default.create({
            chat: body.chat,
            userId: req.user.id
        });
        return res.status(201).json({ message: 'Chat sent successfully', chat: body.chat });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.sendChat = sendChat;
const showChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userId = req.user.id;
        const chats = yield chatapp_1.default.findAll({ where: { userId: userId } });
        console.log(chats);
        return res.status(200).json({ message: 'Chat loaded successfully', chats: chats });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.showChat = showChat;
