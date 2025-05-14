import express from 'express';
import { db } from './db.js';

const app = express();
const PORT = 5003;

app.use(express.json());

app.get('/' , (req , res) => {
    res.send("Hello")
});

app.post('/student' , (req , res) => {
    let reqBody = req.body;
    // if(!reqBody.name)
    try{
        let result = db.query(`
            INSERT INTO students (name , roll_number, batch, phone, date_of_birth) 
            VALUES ('${reqBody.name}' , '${reqBody.rollNumber}' , '${reqBody.batch}' , ${reqBody.phone} , '${reqBody.dob}');
        `)
    }catch(err){

    }
})

app.listen(PORT , () => {
    console.log("Server is Running")
})