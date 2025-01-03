import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';

const Home = () => {

    const [products , setProducts] = useState([]);

    useEffect(() => {
        // 'https://dummyjson.com/products'
        axios.get(`https://dummyjson.com/products`).then((response) => {
            console.log("response" , response)
            setProducts(response.data.products);
        }).catch((error) => {
            console.log("Error", error);
        })
    }, [])

    return (
        <div className="">
            <div className="d-flex flex-column justify-content-center align-items-center row-gap-4 pt-4">
                {products.map((ele , index) => (
                    <Link to={`/detail/${ele?.id}`} key={index} style={{}} className='text-decoration-none'>
                        <Card key={index} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={ele?.images[0]} />
                            <Card.Body>
                            <Card.Title>{ele?.id}: {ele?.title}</Card.Title>
                            <Card.Text>
                                {ele?.description}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home