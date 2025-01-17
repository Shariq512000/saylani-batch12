import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { initializeApp } from 'firebase/app';
import Signup from './pages/Signup';

function App() {
  const [count, setCount] = useState(0);

  const firebaseConfig = {
    apiKey: "AIzaSyD70WHgzBXXTuu6nnsRCaIQeLjjiPXg2EI",
    authDomain: "social-app-6bfc2.firebaseapp.com",
    projectId: "social-app-6bfc2",
    storageBucket: "social-app-6bfc2.firebasestorage.app",
    messagingSenderId: "497661125540",
    appId: "1:497661125540:web:d2e24f6a3e8cfd0f051731"
  };
  
  const app = initializeApp(firebaseConfig);

  return (
    <>
      <Signup />
    </>
  )
}

export default App
