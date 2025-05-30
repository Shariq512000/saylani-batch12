import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

const Signup = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth();

    const createUser = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: userName, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s"
            }).then(() => {

                sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    console.log("Email verification sent!")
                    // ...
                })
                .catch(() => {
                    console.log("Verification not sent")
                })

                console.log("Profile Updated")
                // Profile updated!
                // ...
            }).catch((error) => {
                console.log("Update Profile Err" , error)
                // An error occurred
                // ...
            });
            console.log("Res" , user)
            // ...
        })
        .catch((error) => {
            console.log("err" , error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

  return (
    <div>
        <form onSubmit={createUser}>
            <label htmlFor="userName">
                Name:<input 
                        type="text" id='userName' 
                        value={userName} 
                        onChange={(e) => {setUserName(e?.target.value)}}
                     />
            </label>
            <br />
            <label htmlFor="email">
                Email <input type="text" id='email' value={email} onChange={(e) => {setEmail(e?.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Password<input type="text" value={password} onChange={(e) => {setPassword(e?.target.value)}} />
            </label>
            <br />
            <button>Signup</button>
        </form>
    </div>
  )
}

export default Signup