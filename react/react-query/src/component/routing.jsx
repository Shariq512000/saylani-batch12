import React from 'react';
import { Navigate, Route, Routes } from 'react-router'
import Home from '../pages/Home';
import Products from '../pages/Products';
import Profile from '../pages/Profile';

const Routing = () => {
  return (
    <div className='mainSec'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Products />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to={'/product'} />} />
      </Routes>
    </div>
  )
}

export default Routing