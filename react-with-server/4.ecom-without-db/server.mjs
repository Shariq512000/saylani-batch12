import express from 'express';
import cors from 'cors';

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

let products = []; /// TODO REPLACE WITH DATABASE

app.get('/get-products' , (req , res) => {
    res.send(products)
})

app.post('/add-product', (req , res) => {
    let reqBody = req.body;
    if(!reqBody?.name || !reqBody?.description || !reqBody?.price){
        res.send("Required Parameter Missing")
        return;
    }
    let product = {
        id: new Date().getTime(),
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    }
    products.push(product);
    res.send("Product Added Successful")
})

app.delete('/delete-product/:id' , (req , res) => {
    const productId = req.params.id;

    // let products = [
    //     {id: 1} , {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}
    // ]
    
    // products.splice(2,1)

    for(let i=0; i < products.length; i++){
        if(products[i].id == productId){
            products.splice(i , 1)
        }
    }
})

// app.put('/edit-product' , (req , res) => {

// })

app.listen(port , () => {
    console.log(`App is Running on port ${port}`)
})