import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { messageModel, userModel } from './model.mjs';
import authApi from './api/auth.mjs';
import messageApi from './api/message.mjs';
import { Server } from 'socket.io';
import { createServer } from 'http';

// import {router} form './api/auth'

const app = express();
const PORT = 5005;

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: "*"} });

mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log('Connected!')).catch((err) => console.log("Err", err));

const SECRET = process.env.SECRET_TOKEN;

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', authApi)

app.use('/api/v1/*splat' , (req, res, next) => {
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "Unauthorized"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
        if (!err) {

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true,
                    // sameSite: "none",
                    secure: true
                });
                res.send({ message: "token expired" })

            } else {

                console.log("token approved");
                req.body = {
                    ...req.body,
                    token: decodedData
                }
                next();
            }
        } else {
            res.status(401).send({message: "invalid token"})
        }
    });
});

app.get('/api/v1/profile', async(req , res) => {

    let queryUserId;

    if(req.query.user_id){

        queryUserId = req.query.user_id

    }else{

        queryUserId = req.body.token.id

    }

    try {
        let user = await userModel.findById(queryUserId, {password: 0});
        res.send({message: "User Found" , user: {
            user_id: user._id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email
        }})
    } catch (error) {
        console.log("Error", error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.get('/api/v1/users', async(req, res) => {
    try {
        let result = await userModel.find({}, {password: 0})
        console.log("Result", result);
        res.status(200).send({message: "user found", users: result})
    } catch (error) {
        console.log("Error", error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.use('/api/v1', messageApi(io))

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("disconnect", (reason) => {
        console.log("Client disconnected:", socket.id, "Reason:", reason);
    });

});

// setInterval(() => {

//     io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
//     // console.log("emiting data to all client");

// }, 2000)

const __dirname = path.resolve();//'D:\Shariq Siddiqui\saylani-batch12\react-with-server\6.complete-ecom'
// const fileLocation = path.join(__dirname, './web/build')
app.use('/', express.static(path.join(__dirname, './frontend/build')))
app.use("/*splat" , express.static(path.join(__dirname, './frontend/build')))

server.listen(PORT, () => {
    console.log("Server is Running")
})

mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

// process.on('SIGINT', function () {/////this function will run jst before app is closing
//     console.log("app is terminating");
//     mongoose.connection.close(function () {
//         console.log('Mongoose default connection closed');
//         process.exit(0);
//     });
// });