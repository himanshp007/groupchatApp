"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./utils/database"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: 'GET,PUT,POST,DELETE'
};
app.use((0, cors_1.default)(corsOptions));
app.use('/user', user_1.default);
database_1.default.sync()
    .then(() => {
    console.log("Database sync successful");
    app.listen(3000, () => {
        console.log("Server is running");
    });
})
    .catch((err) => {
    console.error("Database sync error:", err);
});
