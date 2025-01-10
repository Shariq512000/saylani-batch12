import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import ProductDetail from '../pages/ProductDetail'
import { Navigate } from 'react-router'
import { GlobalContext } from '../context/Context'
import { CircularProgress } from '@mui/material'

const CustomRoutes = () => {
    let {state , dispatch} = useContext(GlobalContext);
  return (
    <div>
        {(state.isLogin == true)?
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/detail/:id" element={<ProductDetail />} />
                <Route path="*" element={<Navigate to={"/home"} />} />
            </Routes>
            :
            (state.isLogin == false)?
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
            :
            <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                <CircularProgress size={250} />
            </div>
        }
      
    </div>
  )
}

export default CustomRoutes