import moment from 'moment'
import React from 'react'

const ProductCard = ({eachProduct}) => {
  return (
    <div className="" style={{border: "1px solid black", width: 350, borderRadius: 6, padding: 10}}>
        <h1>{eachProduct.name}</h1>
        <h6>{eachProduct.price}</h6>
        <p>{eachProduct.description}</p>
        <p>Posted At: {moment(eachProduct.created_at).format("DD MMM YYYY hh:mm:ss A")}</p>
    </div>
  )
}

export default ProductCard