import { Link, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile"
import CustomRoutes from "./component/Routes";
import { useContext } from "react";
import { GlobalContext } from "./context/Context";

const App = () => {
  let {state , dispatch} = useContext(GlobalContext);

  console.log("State" , state)
  
  return(
    <div className="">
      <header>
        <div className="logo">

        </div>
        <nav>
          <ul>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          </ul>
        </nav>

        <div className="">
          <img src="" alt="" />
        </div>
      </header>
      <CustomRoutes />
    </div>
  )
}

export default App;