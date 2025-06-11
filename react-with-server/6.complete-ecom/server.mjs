import express from 'express';
import { db } from './db.mjs';
import cors from 'cors';
import bcrypt from "bcryptjs";
import { customAlphabet } from 'nanoid'

const app = express();
const PORT = 5004;

app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost/3000" , ""]
// }))
// app.use(cors());

app.get('/' , async(req , res) => {
    try {
        let result = await db.query('SELECT * FROM users')
        res.status(200).send({message: "Success" , data: result.rows, result: result})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
});

app.post('/sign-up' , async(req, res) => {
    let reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.password){
        res.status(400).send({message: "required parameter missing"})
        return;
    }
    reqBody.email = reqBody.email.toLowerCase();
    let query = `SELECT * FROM users WHERE email = $1`
    let values = [reqBody.email]
    try {
        let result = await db.query(query , values)
        // console.log(result);
        if(result.rows?.length){
            res.status(400).send({message: "User Already Exist With This Email"});
            return;
        }
        let addQuery = `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(reqBody.password, salt);
        // console.log("salt" , salt, hash)
        // const nanoid = customAlphabet('1234567890', 6)
        let addValues = [reqBody.firstName , reqBody.lastName, reqBody.email, hash]
        let addUser = await db.query(addQuery , addValues);
        res.status(201).send({message: "User Created"})
    } catch (error) {
        console.log("ERROR" , error);
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.post('/login' , async(req , res) => {
    let reqBody = req.body;
    if(!reqBody.email || !reqBody.password){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }
    let query = `SELECT * FROM users WHERE email = $1`;
    let values = [reqBody.email];

    try {
        let result = await db.query(query, values);
        if(!result.rows.length){
            res.status(400).send({message: "User Doesn't exist with this Email"});
            return;
        }
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.listen(PORT, () => {
    console.log("Server is Running")
})