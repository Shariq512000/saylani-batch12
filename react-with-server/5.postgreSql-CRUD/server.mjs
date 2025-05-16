import express from 'express';
import { db } from './db.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 5003;

app.use(express.json());
app.use(cors());

app.get('/products' , async(req , res) => {
    try {
        let result = await db.query(`SELECT * FROM products`);
        res.status(200).send({message: "Product Found" , product_list: result.rows})
    } catch (error) {
        console.log("error" , error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.post('/product' , async(req , res) => {
    let reqBody = req.body;
    if(!reqBody.name || !reqBody.price || !reqBody.description){
        res.status(400).send({message : "Required Parameter Missing"})
        return;
    }
    try{
        let result = await db.query(`INSERT INTO products (name , price , description) VALUES ('${reqBody.name}' , ${reqBody.price} , '${reqBody.description}')`)
        res.status(201).send({message: "Product Added"})
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.listen(PORT , () => {
    console.log("Server is Running")
})