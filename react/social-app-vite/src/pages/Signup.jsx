import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const auth = getAuth();

    const signUpUser = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("userCredential" , userCredential)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error" , error)
            // ..
        });
    }

  return (
    <div>
        <form onSubmit={signUpUser}>
            <label htmlFor="">
                Email : <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Password : <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </label>
            <br />
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup