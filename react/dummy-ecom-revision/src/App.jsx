import Home from "./pages/Home";
import {Routes , Route, Navigate, Link} from "react-router";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/Context";
import axios from "axios";

const App = () => {

  let {state, dispatch} = useContext(GlobalContext);

  useEffect(() => {
    let userToken = localStorage.getItem("token")
    let config = {
      url: "https://dummyjson.com/auth/me",
      method: "get",
      headers: {
        'Authorization': `Bearer ${userToken}`, // Pass JWT via Authorization header
      }
    }
    axios.request(config)
    .then((res) => {
      console.log(res)
      dispatch({type: "USER_LOGIN", user: res.data})
    })
    .catch((err) => {
      console.log("Err" , err)
      localStorage.removeItem("token")
      dispatch({type: "USER_LOGOUT"})
    })
  } , [])

  return(
    <div>
      <header className="flex items-center justify-between px-10 py-4 bg-rose-200">
        <div className="logo">
          NEW LOGO
        </div>
        <nav>
          <ul className="flex gap-x-3">
            <li><Link to={"/login"} className="text-black text-sm">Login</Link></li>
            <li><Link to={"/home"} className="text-black text-sm">Home</Link></li>
          </ul>
        </nav>
      </header>
      
      {(state.isLogin == true) ?
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
        :
        (state.isLogin == false) ?
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
        :
        <p>Loading....</p>
      }
    </div>
  )
}

export default App;