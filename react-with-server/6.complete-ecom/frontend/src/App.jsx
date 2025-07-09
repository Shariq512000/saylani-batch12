import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Signup from './pages/signup';
import Login from './pages/login';
import Category from './pages/category';
import AddProduct from './pages/add-product';
import Home from './pages/home';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import axios from 'axios';
import api from './component/api';

function App() {
  let {state, dispatch} = useContext(GlobalContext);

  useEffect(() => {
    const getUserData = async() => {
      try {
        let res = await api.get('/profile');
        dispatch({type: "USER_LOGIN", user: res.data?.user})
        
      } catch (error) {
        dispatch({type: "USER_LOGOUT"})
      }
    }
    getUserData();
  } , [])

  return (
    <div>
        {(state.isLogin == true)?
          <>
            <Routes>
              <Route path='/category' element={<Category />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/home' element={<Home />} />
              <Route path='*' element={<Navigate to={"/home"} />} />
            </Routes>
          </>
          :
          (state.isLogin == false)?
          <>
            <Routes>
              <Route path='/sign-up' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to={"/login"} />} />
            </Routes>
          </>
          :
          <div>
            Loading...
          </div>
        }
    </div>
  );
}

export default App;
