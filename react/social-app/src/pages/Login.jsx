import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword  } from "firebase/auth";

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
    
    const forgetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const [userEmail , setUserEmail] = useState()

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
        <form>
            <label htmlFor="">
                Your Email: <input type="email" />
            </label>
            <button type='submit'>Forget Password</button>
        </form>
    </div>
  )
}

export default Login