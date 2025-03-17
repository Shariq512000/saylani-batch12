import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {

    const [pageNumber , setPageNumber] = useState(1)
    const [skip , setSkip] = useState(0)

    const getProduct = async() => {
        try {
            let res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${skip}&limit=10`);
            console.log("Res" , res);
            return res.data
        } catch (error) {
            console.log("Error" , error);
        }
    }

    const productCall = useQuery({
        queryKey: ['product', pageNumber],
        queryFn: getProduct,
        // gcTime: 20000, // default 5 minutes
        // staleTime: 5000, // default 0 millisecond
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true
    })

    console.log("productCall" , productCall)

  return (
    <div>
        {(productCall.isLoading) ?
            <p>Loading...</p>
            :
            (productCall.isError)?
            <div className="">{'Something went wrong'}</div>
            :
            productCall.data?.map((e , i) => {
                return(
                    <div className="">
                        <h1>{e?.id}</h1>
                        <div key={i} className="">{e?.title}</div>
                    </div>
                )
            })
        }
        <div className="" style={{display: "flex" , alignItems: "center", gap: 12, marginTop: 30}}>

            <button onClick={() => {
                setPageNumber((prev) => prev-1);
                setSkip((prev) => prev-10)
            }} disabled={pageNumber == 1 ? true : false}>Previous</button>

            <p>{pageNumber}</p>

            <button onClick={() => {
                setPageNumber((prev) => prev+1);
                setSkip((prev) => prev+10)
            }}>Next</button>

        </div>
    </div>
  )
}

export default Products