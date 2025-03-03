import React from 'react'
import Products from './page/Products'
import { Link, Route, Routes, Navigate } from 'react-router'
import Login from './page/Login'

const App = () => {
  return (
    <>
        <nav>
            <Link to={"/login"}>Login</Link>
            <br />
            <Link to={"/"}>Products</Link>
        </nav>
        <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    </>
  )
}

export default App