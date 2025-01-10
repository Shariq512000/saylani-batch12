import { Link, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile"
import CustomRoutes from "./component/Routes";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/Context";
import axios from "axios";

const App = () => {
  let {state , dispatch} = useContext(GlobalContext);

  console.log("State" , state)

  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    axios.get('https://dummyjson.com/auth/me' , { headers: { Authorization: `Bearer ${userToken}` }})
    .then((res) => {
      console.log(res.data)
      dispatch({type: "USER_LOGIN", payload: res.data})
    })
    .catch((err) => {
      userLogout();
      console.log(err)
    })
  }, [])

  const userLogout = () => {
    localStorage.removeItem("userToken");
    dispatch({type: "USER_LOGOUT"})
  }
  
  return(
    <div className="">
      {(state.isLogin)?
        <header>
          <div className="logo">

          </div>
          <nav>
            <ul>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <button onClick={userLogout}>Logout</button>
              </li>
            </ul>
          </nav>

          <div className="">
            <img src="" alt="" />
          </div>
        </header>
        :
        null
      }
      <CustomRoutes />
    </div>
  )
}

export default App;