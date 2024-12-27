import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Rating from '@mui/material/Rating';

const ProductDetail = () => {
    const {id} = useParams();

    const [productDetail, setProductDetail] = useState({})

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
            console.log("response" , response)
            setProductDetail(response?.data)
        }).catch((error) => {
            console.log("Error", error);
        })
    }, [])

  return (
    <div>
        <h1>{productDetail?.brand}</h1>
        <div className="d-flex flex-column justify-content-center align-items-center row-gap-4">
            {productDetail?.reviews?.map((ele, i) => {
                return(
                    <div className="card p-3 shadow" key={i} style={{width: 350}}>
                        <div className="">
                            <h6>{ele?.reviewerName}</h6>
                            <p>{ele?.reviewerEmail}</p>
                        </div>

                        <p>{ele?.comment}</p>

                        <Rating name="half-rating-read" defaultValue={ele.rating} precision={0.5} readOnly />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ProductDetail