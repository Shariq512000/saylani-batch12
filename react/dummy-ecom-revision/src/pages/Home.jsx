import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import { GlobalContext } from '../context/Context';

const Home = () => {

    let {state, dispatch} = useContext(GlobalContext);
    console.log(state)
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
            <Link to={`/product-detail/${eachProduct.id}`} className="" key={eachProduct.id} style={{padding: 20, borderRadius: 8, border: "1px solid #EEE", width: 250}}>
                {eachProduct.title}
            </Link>
        ))}
    </div>
  )
}

export default Home