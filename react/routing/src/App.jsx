import { Link, Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import "./App.css"
import NotFound from "./pages/NotFound";

const App = () => {
  return(
    <div>
      <nav>
        <ul>
          <li><Link to={"/login"}>Login</Link></li>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/about"}>About</Link></li>
        </ul>
      </nav>
      <div className="pages">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace={true} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;