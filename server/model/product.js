import mongoose from "mongoose";




const productScehma = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    }

})

const Product = mongoose.model('products',productScehma )

export default Product