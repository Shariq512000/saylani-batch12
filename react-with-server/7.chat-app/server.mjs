import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bcrypt from "bcryptjs";
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { messageModel, userModel } from './model.mjs';

const app = express();
const PORT = 5005;

mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log('Connected!')).catch((err) => console.log("Err", err));

const SECRET = process.env.SECRET_TOKEN;

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.post('/api/v1/sign-up' , async(req, res) => {
    let reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.password){
        res.status(400).send({message: "required parameter missing"})
        return;
    }
    reqBody.email = reqBody.email.toLowerCase();
    try {
        let user = await userModel.findOne({email: reqBody.email})
        console.log("user", user)
        if(!user){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(reqBody.password, salt);
            let result = await userModel.create({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                password: hash
            })
            res.status(201).send({message: "User Created"})
        }else{
            res.status(400).send({message: "User Already Exist With This Email"})
        }
    } catch (error) {
        console.log("ERROR" , error);
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.post('/api/v1/login' , async(req , res) => {
    let reqBody = req.body;
    if(!reqBody.email || !reqBody.password){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }
    reqBody.email = reqBody.email.toLowerCase();

    try {
        let user = await userModel.findOne({email: reqBody.email})
        // console.log("user", user)
        if(!user){
            res.status(400).send({message: "User Not Found With This Email"});
            return;
        }
        // let user = result.rows[0]
        // console.log("Result" , result.rows);
        let isMatched = await bcrypt.compare(reqBody.password, user.password); // true

        if(!isMatched){
            res.status(401).send({message: "Password did not Matched"});
            return;
        }

        let token = jwt.sign({
            id: user._id,
            firstName: user.firstName,
            last_name: user.lastName,
            email: user.email,
            iat: Date.now() / 1000,
            exp: (Date.now() / 1000) + (60*60*24)
        }, SECRET);

        res.cookie('Token', token, {
            maxAge: 86400000, // 1 day
            httpOnly: true,
            secure: true
        });
        res.status(200)
        res.send({message: "User Logged in" , user: {
            user_id: user._id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
        }})
        // res.status(200).send({message: "Testing" , result: result.rows, isMatched})

    } catch (error) {
        console.log("Error", error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.get('/api/v1/logout', (req, res) => {
    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true,
        // sameSite: "none",
        secure: true
    });
    res.status(200).send({message: "User Logout"})
})

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
    let userId = req.body.token.id
    try {
        let user = await userModel.findById(userId, {password: 0});
        res.send({message: "User Logged in" , user: {
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

app.post('/api/v1/chat/:id', async(req, res) => {
    let receiverId = req.params.id;
    let senderId = req.body.token.id
    try {
        let result = await messageModel.create({
            from: senderId,
            to: receiverId,
            text: req.body.message
        })
        res.send({message: "Message Send"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.listen(PORT, () => {
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