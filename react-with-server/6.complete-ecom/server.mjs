import 'dotenv/config'
import express from 'express';
import { db } from './db.mjs';
import cors from 'cors';
import bcrypt from "bcryptjs";
import { customAlphabet } from 'nanoid';
import jwt from 'jsonwebtoken';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5004;

const SECRET = process.env.SECRET_TOKEN;
// app.use(cors());
// app.use(cors({
//     origin: ["http://localhost:3000" , "*"]
// }))
// app.use(cors());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// app.get('/' , async(req , res) => {
//     try {
//         let result = await db.query('SELECT * FROM users')
//         res.status(200).send({message: "Success" , data: result.rows, result: result})
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"})
//     }
// });

// axios.get('/user-detail', {abc: 123})

// axios.post('/api/v1/category', {name: "abc", description: "des"})

app.post('/api/v1/sign-up' , async(req, res) => {
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

app.post('/api/v1/login' , async(req , res) => {
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
            exp: (Date.now() / 1000) + (60*60*24)
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

app.get('/api/v1/logout', (req, res) => {
    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true,
        // sameSite: "none",
        secure: true
    });
})

app.use('/api/v1/*splat' , (req, res, next) => {
    // console.log("req?.cookies?.Token" , req?.cookies?.Token);
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "Unauthorized"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
        if (!err) {

            // console.log("decodedData: ", decodedData);

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
                // {name: "abc", description: "des"}
                req.body = {
                    ...req.body,
                    token: decodedData
                }
                // method: get
                // url: '/user-detail'
                // body: {abc: 123, token: decodedData}
                next();
            }
        } else {
            res.status(401).send({message: "invalid token"})
        }
    });
})

app.get('/api/v1/profile' , (req, res) => {
    console.log("reqBody", req.body);
    res.status(200).send({message: "user found"})
})

app.get('/api/v1/user-detail' , async(req, res) => {
    let userToken = req.body.token;
    let query = `SELECT * FROM users WHERE user_id = $1`;
    let value = [userToken.id]
    try {
        let result = await db.query(query, value)
        res.status(200).send({message: "User Found" , user: {
            user_id: result.rows[0].user_id,
            first_name: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            email: result.rows[0].email,
            phone: result.rows[0].phone,
            user_role: result.rows[0].user_role,
            profile: result.rows[0].profile,
        }})
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.get('/api/v1/categories' , async(req , res) => {
    try {
        let result = await db.query(`SELECT * FROM categories`);
        res.status(200).send({message: "Categories Found" , category_list: result.rows})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

app.get('/api/v1/products', async(req , res) => {

    console.log("reqBody" , req.body);

    try {
        let result = await db.query(`SELECT p.product_id, p.product_name, p.price, p.product_image, p.description, p.created_at, c.category_name 
        FROM products AS p 
        INNER JOIN categories c ON p.category_id = c.category_id`);
        res.status(200).send({message: "Product Found" , products: result.rows})
    } catch (error) {
        console.log("error" , error)
        res.status(500).send({message: "Internal Server Error", err: error})
    }
})

app.use('/api/v1/*splat' , (req, res, next) => {
    if (req.body.token.user_role != 1) {
        res.status(401).send({
            message: "Unauthorized"
        })
        return;
    }else{
        next();
    }
})

app.post('/api/v1/category' , async(req , res) => {
    let reqBody = req.body
    if(!reqBody.name || !reqBody.description){
        res.status(400).send({message: "Required Parameter Missing"})
        return;
    }
    try {
        let query = `INSERT INTO categories(category_name , description) VALUES ($1, $2)`;
        let values = [reqBody.name , reqBody.description]
        let result = await db.query(query , values);
        res.status(201).send({message: "Category Added"})
    } catch (error) {
        console.log("Error" , error)
        res.status(500).send({message: "Internal Server Error", error})
    }
})

app.post('/api/v1/product' , async(req , res) => {
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

// let products = [{category_id: 1}];
// p = products

// let categories = [{category_id: 1, category_name: "abc"}, {category_id: 2, category_name: "def"}];
// c = categories

const __dirname = path.resolve();//'D:\Shariq Siddiqui\saylani-batch12\react-with-server\6.complete-ecom'
// const fileLocation = path.join(__dirname, './web/build')
app.use('/', express.static(path.join(__dirname, './frontend/build')))
app.use("/*splat" , express.static(path.join(__dirname, './frontend/build')))

app.listen(PORT, () => {
    console.log("Server is Running")
})
