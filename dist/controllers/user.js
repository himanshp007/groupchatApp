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
exports.postLogin = exports.postUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { name, email, phone, password } = body;
        if (!name || !email || !phone || !password) {
            return res.status(401).json({ message: "All fields are mandatory" });
        }
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (user) {
            return res.status(404).json({ message: "Email already registered" });
        }
        ;
        bcrypt_1.default.hash(password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            yield user_1.default.create({
                name: body.name,
                email: body.email,
                phone: body.phone,
                password: hash,
            });
            return res.status(201).json({ message: "User Added Successfully" });
        }));
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Failed to add User' });
    }
});
exports.postUser = postUser;
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ userId: id }, process.env.USER_TOKEN);
}
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { email, password } = body;
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are mandatory" });
        }
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "User not authorized" });
        }
        const token = generateToken(user.id);
        console.log({ message: "Logged in Successfully", token: token }); // Log the response
        return res.status(201).json({ message: "Logged in Successfully", token: token });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in User' });
    }
});
exports.postLogin = postLogin;
