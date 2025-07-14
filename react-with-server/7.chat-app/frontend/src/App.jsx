import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import api from './component/api';
import Chat from './pages/chat';

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
              <Route path='/home' element={<Home />} />
              <Route path='/chat/:id' element={<Chat />} />
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
