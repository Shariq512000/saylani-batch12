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
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/home"}>Home</Link>
      <br />
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