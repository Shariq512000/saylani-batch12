import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../context/Context';

const ProductDetail = () => {

    let {state, dispatch} = useContext(GlobalContext);

    const {id} = useParams();

    const [productDetail , setProductDetail] = useState({})

    useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
            console.log(res)
            setProductDetail(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const addToCart = () => {
        // axios.post('https://dummyjson.com/carts/add', {

        // })

        let addData = {
            userId: 1,
            products: [
                {
                    id: id,
                    quantity: 4,
                }
            ]
        }

        let addConfig = {
            url: 'https://dummyjson.com/carts/add',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(addData)
        }

        axios.request(addConfig)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <h2>Title: {productDetail.title}</h2>
            <p>Description: {productDetail.description}</p>

            <button onClick={addToCart}>Add To Cart</button>
        </div>
    )
}

export default ProductDetail