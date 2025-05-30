import './App.css';
import { initializeApp } from "firebase/app";
import { Link, Routes } from 'react-router';
import CustomRoutes from './component/CustomRoutes';
import { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { GlobalContext } from './context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let {state , dispatch} = useContext(GlobalContext);

  const [open , setOpen] = useState(false)

  console.log(state)

  const firebaseConfig = {
    apiKey: "AIzaSyCwXn62WFapkc8COdouUtjGjybN7Mazro4",
    authDomain: "social-app-5db79.firebaseapp.com",
    projectId: "social-app-5db79",
    storageBucket: "social-app-5db79.firebasestorage.app",
    messagingSenderId: "1005715798527",
    appId: "1:1005715798527:web:725f51b5ee05773a19cfca"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("user" , user);
      if (user) {
        if(user?.email == "www.shariq512000@gmail.com"){
          dispatch({type: "ADMIN_LOGIN", payload: user})
        }else{
          dispatch({type: "USER_LOGIN", payload: user})
        }
        const uid = user.uid;
      } else {
        dispatch({type: "USER_LOGOUT"})
        console.log("User Not Found")
        // User is signed out
        // ...
      }
    });
  } , [])

  const logoutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful")
    }).catch((error) => {
      // An error happened.
      console.log("An error happened", error)
    });
  }

  return (
    <div className="App bg-red-700">
      <header className=''>
        <div className="logo">
        </div>

        <div className="tw-hidden sm:tw-block">
          {state?.isLogin == true ?
            <div className="tw-flex tw-items-center tw-gap-x-3">
              <Link to={"/profile"}>Profile</Link>
              <button onClick={logoutUser}>Logout</button>
            </div>
            :
            <nav>
              <ul>
                <li>
                  <Link to={"/signup"}> Signup </Link>
                </li>
                <li>
                  <Link to={"/login"}> Login </Link>
                </li>
              </ul>
            </nav>
          }
        </div>
        <div className="sm:tw-hidden" onClick={() => {setOpen(true)}}>
          <div className="tw-flex tw-flex-col tw-gap-y-1">
            <div className="tw-h-[2px] tw-w-5 tw-bg-black"></div>
            <div className="tw-h-[2px] tw-w-5 tw-bg-black"></div>
            <div className="tw-h-[2px] tw-w-5 tw-bg-black"></div>
          </div>
        </div>
      </header>
      <CustomRoutes />
      {open?
        <div className="tw-fixed tw-bg-white tw-h-screen tw-w-screen tw-top-0 tw-right-0">
          <div className="tw-flex tw-justify-end">
            <div onClick={() => {setOpen(false)}} className='tw-w-6 tw-h-6 tw-rounded-[50%] tw-bg-black tw-flex tw-items-center tw-justify-center tw-text-white'>X</div>
          </div>

          <div className="">
            {state?.isLogin == true ?
              <div className="tw-flex tw-items-center tw-flex-col">
                <Link to={"/profile"}>Profile</Link>
                <button onClick={logoutUser}>Logout</button>
              </div>
              :
              <nav>
                <ul className="tw-flex tw-items-center tw-flex-col">
                  <li>
                    <Link to={"/signup"}> Signup </Link>
                  </li>
                  <li>
                    <Link to={"/login"}> Login </Link>
                  </li>
                </ul>
              </nav>
            }
          </div>
        </div>
        :
        null
      }
    </div>
  );
}

export default App;