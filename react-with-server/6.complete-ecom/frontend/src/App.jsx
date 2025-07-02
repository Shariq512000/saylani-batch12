import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Signup from './pages/signup';
import Login from './pages/login';
import Category from './pages/category';
import AddProduct from './pages/add-product';
import Home from './pages/home';
import { useContext } from 'react';
import { GlobalContext } from './context/Context';

function App() {
  let {state, dispatch} = useContext(GlobalContext);
  
  return (
    <div>
      <Routes>
        {(state.isLogin == true)?
          <>
            <Route path='/category' element={<Category />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<Navigate to={"/home"} />} />
          </>
          :
          (state.isLogin == false)?
          <>
            <Route path='/sign-up' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={"/login"} />} />
          </>
          :
          <>
          </>
        }
      </Routes>
    </div>
  );
}

export default App;
