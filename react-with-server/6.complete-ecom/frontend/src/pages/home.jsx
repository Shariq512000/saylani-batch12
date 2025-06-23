import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
    const [products , setProducts] = useState([]);
    useEffect(() => {
        const getProduct = async() => {
            let res = await axios.get('http://localhost:5004/products');
            console.log("res" , res.data)
            setProducts(res.data.products)
        }
        getProduct()
    } , [])
  return (
    <div>Home</div>
  )
}

export default Home