import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import sequelize from "./utils/database";
import userRoutes from './routes/user';


const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: 'GET,PUT,POST,DELETE'
};
app.use(cors(corsOptions));

app.use('/user', userRoutes);


sequelize.sync()
    .then(() => {
        console.log("Database sync successful");
        app.listen(3000, () => {
            console.log("Server is running")
        })
    })
    .catch((err: any) => {
        console.error("Database sync error:", err)
    })