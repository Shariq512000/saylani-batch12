
import express from "express"
import mongoose from "mongoose"
import Product from "./model/product.js"



const app = express()
const PORT = 5000

app.use(express.json())


const mongoURI = ""
mongoose.connect(mongoURI)
mongoose.connection.on('connected',()=> console.log("mongodb is connected"))
mongoose.connection.on('error',()=> console.log("mongodb is not connected"))




app.get('/products',async (request,response)=>{
    const product = await Product.fi
    response.json({
        message: "get",
        product
    })
})

app.post('/product', async (request,response)=>{
    console.log(request.body)
    const product = await Product.create(request.body)
})

app.post('/product', async (request,response)=>{
    console.log(request.body)
    const product = await Product.create(request.body)
})

app.put('/product/:id', async (request,response)=>{


   const {id} = request.params
    const product = await Product.findByIdAndUpdate(id, request.body,{
        new: true
    })

    response.json({
        message: "updated",
        product
    })
})

app.delete('/product/:id', async (request,response)=>{


    const {id} = request.params
     const product = await Product.findByIdAndDelete(id)
 
     response.json({
         message: "delete",
  
     })
 })

app.listen(PORT, ()=>{
    console.log('server is running')
})



