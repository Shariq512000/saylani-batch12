import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [products, setProducts] = useState([]);

    console.log(products)

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
        .then((res) => {
            setProducts(res.data.products)
        })
        .catch((err) => {console.log(err)})
    }, [])


  return (
    <div className="" style={{display: "flex", rowGap: 12, flexDirection:"column", alignItems: "center"}}>
        {products?.map((eachProduct) => (
            <div className="" key={eachProduct.id} style={{padding: 20, borderRadius: 8, border: "1px solid #EEE", width: 250}}>
                {eachProduct.title}
            </div>
        ))}
    </div>
  )
}

export default Home