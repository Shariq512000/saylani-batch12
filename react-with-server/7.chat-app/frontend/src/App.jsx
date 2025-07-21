import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/Context';
import api from './component/api';
import Chat from './pages/chat';
import io from 'socket.io-client';
import moment from 'moment';

function App() {
  let {state, dispatch} = useContext(GlobalContext);

  const [notifications , setNotifications] = useState([])

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

  useEffect(() => {
    const socket = io(state.baseSocketIo);

    if(state.isLogin){

  
      socket.on('connect', () => {
        console.log("Connected to server");
      });
  
      socket.on(`personal-channel-${state.user.user_id}`, (data) => {
        console.log("Received: App", data);
        setNotifications(prev => [...prev, data])
      });
  
      socket.on('disconnect', (reason) => {
        console.log("Disconnected. Reason:", reason);
      });
  
      socket.on('error', (error) => {
        console.log("Error:", error);
      });
    }
    
    return () => {
      console.log("Component unmount")
      socket.close();  // cleanup on unmount
    };
  }, [state.user.user_id]);

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
      <div className="notificationWrapper">
        {notifications?.map((eachMsg, i) => (
          <div key={i} className="notification">
            <h1>{eachMsg?.from?.firstName} {eachMsg?.from?.lastName}</h1>
            <p>{eachMsg?.text}</p>
            <span>
              {moment(eachMsg?.createdOn).fromNow()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
