import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth();

    const loginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Res" , user)
            // ...
        })
        .catch((error) => {
            console.log("Err" , error)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

  return (
    <div>
        <form onSubmit={loginUser}>
            <label htmlFor="email">
                Email <input type="text" id='email' value={email} onChange={(e) => {setEmail(e?.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Password<input type="text" value={password} onChange={(e) => {setPassword(e?.target.value)}} />
            </label>
            <br />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login