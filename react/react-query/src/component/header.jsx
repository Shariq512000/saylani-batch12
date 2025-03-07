import React, { useEffect } from 'react';
import { Link } from 'react-router';

const Header = () => {
  
  useEffect(() => {
    console.log("Header Loaded")
  } , [])

  return (
    <header>
        <nav>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/product'}>Product</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header