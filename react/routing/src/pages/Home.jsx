import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div style={{fontSize: 35, height: "100vh", backgroundColor: "blue"}}>
        Home
        <Link to={"/about"}>Go to About Page</Link>
    </div>
  )
}

export default Home