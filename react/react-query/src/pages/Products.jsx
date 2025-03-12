import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    const {data , isLoading, isError, error} = useQuery({
        queryKey: 'product',
        queryFn: getProduct,
        gcTime: 20000, // default 5 minutes
        // staleTime: 5000, // default 0 millisecond
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true
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