import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  
  return(
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App;