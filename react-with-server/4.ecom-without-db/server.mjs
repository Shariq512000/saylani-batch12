import express from 'express';

const app = express();
const port = 5002;

let products = []; /// TODO REPLACE WITH DATABASE

app.get('/' , (req , res) => {
    const id = req.ip;
    res.send({"ip_address": id})
})


app.get('get-products' , (req , res) => {
    res.send(products)
})

app.post('add-product', (req , res) => {
    let reqBody = req.body;
    if(!reqBody.name || !reqBody.description || !reqBody.price){
        res.send("Required Parameter Missing")
        return;
    }
    let product = {
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    }
    products.push(product);
    res.send("Product Added Successful")
})

app.listen(port , () => {
    console.log(`App is Running on port ${port}`)
})