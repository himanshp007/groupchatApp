"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const chatapp_1 = require("../controllers/chatapp");
const router = (0, express_1.Router)();
router.get('/getchats/:chatId', auth_1.default, chatapp_1.showChat);
router.post('/sendchats', auth_1.default, chatapp_1.sendChat);
exports.default = router;
