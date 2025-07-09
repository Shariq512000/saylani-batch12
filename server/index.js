

import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import Product from './model/product.js'
import User from './model/user.js'



const app = express()
const PORT = 5000

dotenv.config()

app.use(express.json())



mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected', ()=>console.log('mongo db is connected'))
mongoose.connection.on('error', ()=>console.log('mongo db is not connected'))


app.post('/product', async (req,res)=> {

    console.log(req.body)

    await Product.create(req.body)

})

app.get('/products',async (req,res)=> {
  const product =  await Product.find()
  return res.json({
    message: "product get ",
    product
  })
})

app.delete('/product/:id', async (req,res)=> {


    const {id} = req.params

   const product = await Product.findByIdAndDelete(id)
   

})

app.put('/product/:id', async (req,res)=> {


    const {id} = req.params

   const product = await Product.findByIdAndUpdate(id, req.body)
   

})


app.post('/user', async (req,res)=> {

    const {userName,email,password} = req.body

    const user = await User.create( req.body)

    res.status(201).json({
        message: "USer created",
        data: user
    })

})


app.listen(PORT,()=> {
    console.log(`server is running`)
})

