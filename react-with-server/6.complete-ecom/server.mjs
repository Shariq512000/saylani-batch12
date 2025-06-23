import 'dotenv/config'
import express from 'express';
import { db } from './db.mjs';
import cors from 'cors';
import bcrypt from "bcryptjs";
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import path from 'path';

const app = express();
const PORT = 5004;

const SECRET = process.env.SECRET_TOKEN;

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: ["http://localhost/3000" , ""]
// }))
// app.use(cors());

// app.get('/' , async(req , res) => {
//     try {
//         let result = await db.query('SELECT * FROM users')
//         res.status(200).send({message: "Success" , data: result.rows, result: result})
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"})
//     }
// });

// axios.get('/abc')

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
    reqBody.email = reqBody.email.toLowerCase();
    let query = `SELECT * FROM users WHERE email = $1`;
    let values = [reqBody.email];

    try {
        let result = await db.query(query, values);
        if(!result.rows.length){
            res.status(400).send({message: "User Doesn't exist with this Email"});
            return;
        }
        // let user = result.rows[0]
        // console.log("Result" , result.rows);
        let isMatched = await bcrypt.compare(reqBody.password, result.rows[0].password); // true

        if(!isMatched){
            res.status(401).send({message: "Password did not Matched"});
            return;
        }

        let token = jwt.sign({
            id: result.rows[0].user_id,
            firstName: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            email: result.rows[0].email,
            user_role: result.rows[0].user_role,
            iat: Date.now() / 1000,
            exp: (Date.now() / 1000) + (1000*60*60*24)
        }, SECRET);

        res.cookie('Token', token, {
            maxAge: 86400000, // 1 day
            httpOnly: true,
            secure: true
        });
        res.status(200)
        res.send({message: "User Logged in" , user: {
            user_id: result.rows[0].user_id,
            first_name: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            email: result.rows[0].email,
            phone: result.rows[0].phone,
            user_role: result.rows[0].user_role,
            profile: result.rows[0].profile,
        }})
        // res.status(200).send({message: "Testing" , result: result.rows, isMatched})

    } catch (error) {
        console.log("Error", error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.get('/categories' , async(req , res) => {
    try {
        let result = await db.query(`SELECT * FROM categories`);
        res.status(200).send({message: "Categories Found" , category_list: result.rows})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.post('/category' , async(req , res) => {
    let reqBody = req.body
    if(!reqBody.name || !reqBody.description){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }
    try {
        let query = `INSERT INTO categories(category_name , category_description) VALUES ($1, $2)`;
        let values = [reqBody.name , reqBody.description]
        let result = await db.query(query , values);
        res.status(201).send({message: "Category Added"})
    } catch (error) {
        console.log("Error" , error)
        res.status(500).send({message: "Internal Server Error", error})
    }
})

app.get('/products', async(req , res) => {
    try {
        let result = await db.query(`SELECT p.product_id, p.product_name, p.price, p.description, p.created_at, c.category_name 
        FROM products AS p 
        INNER JOIN categories c ON p.category_id = c.category_id`);
        res.status(200).send({message: "Product Found" , products: result.rows})
    } catch (error) {
        console.log("error" , error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.post('/product' , async(req , res) => {
    // let reqBody = req.body
    let {name, description, price, category_id, image} = req.body;
    if(!name || !description || !price || !category_id || !image){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }
    try {
        let query = `INSERT INTO products(product_name , price, description, product_image, category_id) VALUES ($1, $2, $3, $4, $5)`;
        let values = [name , price, description, image, category_id]
        let result = await db.query(query , values);
        res.status(201).send({message: "Product Added"})
    } catch (error) {
        console.log("Error" , error)
        res.status(500).send({message: "Internal Server Error", error})
    }
})

const __dirname = path.resolve();//'D:\Shariq Siddiqui\saylani-batch12\react-with-server\6.complete-ecom'
// const fileLocation = path.join(__dirname, './web/build')
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use("/*splat" , express.static(path.join(__dirname, './web/build')))

app.listen(PORT, () => {
    console.log("Server is Running")
})