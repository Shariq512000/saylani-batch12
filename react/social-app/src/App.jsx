import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Link, Routes } from 'react-router';
import CustomRoutes from './component/CustomRoutes';
import { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { GlobalContext } from './context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let {state , dispatch} = useContext(GlobalContext);

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
      if (user) {
        console.log("user" , user);
        dispatch({type: "USER_LOGIN", payload: user})
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
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
      <header>
        <div className="logo">

        </div>

        {state?.isLogin == true ?
          <button onClick={logoutUser}>Logout</button>
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
      </header>
      <CustomRoutes />
    </div>
  );
}

export default App;
