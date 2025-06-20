import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to={"/sign-up"} />} />
      </Routes>
    </div>
  );
}

export default App;
