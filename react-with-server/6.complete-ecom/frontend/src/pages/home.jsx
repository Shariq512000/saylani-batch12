import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import { GlobalContext } from '../context/Context';

const Home = () => {
  const [products , setProducts] = useState([]);
  let {state} = useContext(GlobalContext)
  useEffect(() => {
    const getProduct = async() => {
      let res = await axios.get('http://localhost:5004/products');
      console.log("res" , res.data)
      setProducts(res.data.products)
    }
    getProduct()
  } , [])
  return (
    <div>
      {
        (state.user.user_role == 1)?
        <div className=""><Link to={'/add-product'}>Add Product</Link></div>
        :
        null
      }
      {products.map((eachProduct , i) => {
        return(
          <div className="" style={{width: 320, border: "1px solid black", borderRadius: 8, padding: 20, marginBottom: 20}}>
            <img style={{width: "100%"}} src={eachProduct.product_image} alt="" />
            <br />
            <h1>{eachProduct?.product_name}</h1>
            <h6>{eachProduct?.price}</h6>
            <p>{eachProduct?.description}</p>
            <h5>{eachProduct?.category_name}</h5>
          </div>
        )
      })}
    </div>
  )
}

export default Home