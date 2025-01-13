import Home from "./pages/Home";
import {Routes , Route, Navigate, Link} from "react-router";
import Login from "./pages/Login";

const App = () => {

  return(
    <div>
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/home"}>Home</Link>
      <br />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  )
}

export default App;