import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

const Products = () => {

    const getProduct = async() => {
        try {
            let res = await axios.get('https://dummyjson.com/products');
            console.log("Res" , res);
            return res.data.products
        } catch (error) {
            console.log("Error" , error);
        }
    }

    const {data , isLoading, isError} = useQuery({
        queryKey: ['product'],
        queryFn: getProduct
    })

  return (
    <div>
        {(isLoading) ?
            <p>Loading...</p>
            :
            (isError)?
            <div className="">{'Something went wrong'}</div>
            :
            data?.map((e , i) => {
                return(
                    <div key={i} className="">{e?.title}</div>
                )
            })
        }
    </div>
  )
}

export default Products