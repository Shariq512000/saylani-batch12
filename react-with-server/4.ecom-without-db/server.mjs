import express from 'express';
import cors from 'cors';

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

let products = [] /// TODO REPLACE WITH DATABASE

app.get('/get-products' , (req , res) => {
    res.send(products)
})

app.post('/add-product', (req , res) => {
    let reqBody = req.body;
    if(!reqBody?.name || !reqBody?.description || !reqBody?.price){
        res.send("Required Parameter Missing")
        return;
    }

    // let product = 
    products.push(
        {
            id: new Date().getTime(),
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        }
    );
    res.send("Product Added Successful")
})

app.delete('/delete-product/:id' , (req , res) => {
    const productId = req.params.id;

    let isMatched = false;

    for(let i=0; i < products.length; i++){
        if(products[i].id == productId){
            isMatched = true;
            products.splice(i , 1);
            break;
        }
    }

    if(isMatched){
        res.send("Product Deleted");
    }else{
        res.send(`product id (${productId}) did not matched`)
    }

})

app.put('/edit-product/:id' , (req , res) => {
    let reqBody = req.body;
    let productId = req.params.id
    if(!reqBody?.name || !reqBody?.description || !reqBody?.price){
        res.send("Required Parameter Missing")
        return;
    }

    let isMatched = false;

    for(let i=0; i < products.length; i++){
        if(products[i].id == productId){
            isMatched = true;
            // products[i].name = reqBody.name
            // products[i].price = reqBody.price
            // products[i].description = reqBody.description
            products[i] = {
                id: productId,
                name: reqBody.name,
                price: reqBody.price,
                description: reqBody.description
            }
            // products.splice(i , 1 , {
            //     id: productId,
            //     name: reqBody.name,
            //     price: reqBody.price,
            //     description: reqBody.description
            // })
            break;
        }
    }

    if(isMatched){
        res.send("Product Updated");
    }else{
        res.send(`product id (${productId}) did not matched`)
    }

})

// app.put('/edit-product' , (req , res) => {

// })

app.listen(port , () => {
    console.log(`App is Running on port ${port}`)
})