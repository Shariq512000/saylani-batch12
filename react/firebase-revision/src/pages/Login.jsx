import React, { useState } from 'react';
import { 
    getAuth, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GithubAuthProvider  
} from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth();

    const provider = new GithubAuthProvider();

    const signupWithGithub = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

            console.log("User :", user)

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);

            console.log("error" , error)
            // ...
        });
    }

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
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            // Password reset email sent!
            console.log("Reset Email Sent!");
            handleClose();
            // ..
        })
        .catch((error) => {
            console.log("Err" , error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const [userEmail , setUserEmail] = useState("");

    const [show , setShow] = useState(false);

    const handleClose = () => {
        setUserEmail("")
        setShow(false);
    }

    return (
        <div className='loginPage tw-flex tw-items-center tw-flex-col'>
            <form onSubmit={loginUser} className='tw-flex tw-flex-col tw-gap-y-2 tw-items-center tw-border tw-border-slate-400 tw-p-8 tw-rounded-md tw-shadow-2xl'>
                <label htmlFor="email" className='tw-flex tw-gap-x-3 tw-items-center'>
                    Email <input type="text" id='email' value={email} className='tw-border-black tw-border tw-rounded tw-p-2 tw-text-base focus:tw-outline-none focus:tw-border-blue-500 focus:tw-text-blue-500' onChange={(e) => {setEmail(e?.target.value)}} />
                </label>
                <label htmlFor="" className='tw-flex tw-gap-x-3 tw-items-center'>
                    Password<input type="text" placeholder='Password' className='tw-border-black tw-border tw-rounded tw-p-2 tw-text-base focus:tw-outline-none focus:tw-border-blue-500 focus:tw-text-blue-500' value={password} onChange={(e) => {setPassword(e?.target.value)}} />
                </label>
                <div className="tw-flex tw-justify-end tw-w-full">
                    <p className='text-underline tw-mb-0' onClick={() => {setShow(true)}} style={{textDecoration: "underline", cursor: "pointer"}}>Forgot Password</p>
                </div>
                <button type='submit' className='tw-bg-transparent tw-text-blue-500 tw-px-3 tw-py-1 tw-transition-all tw-duration-500 tw-rounded tw-border tw-border-blue-500 hover:tw-bg-blue-500 hover:tw-text-white'>Login</button>
                <button type='button' className='tw-bg-transparent tw-text-slate-500 tw-px-3 tw-py-1 tw-transition-all tw-duration-500 tw-rounded tw-border tw-border-slate-500 hover:tw-bg-slate-500 hover:tw-text-white' onClick={signupWithGithub}>Login With Github</button>
            </form>


            {/* <form>
                <label htmlFor="">
                    Your Email: <input type="email" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
                </label>
                <button type='submit'>Forget Password</button>
            </form> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="">
                        Enter Email : <input type="email" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={forgetPassword}>
                        Send Email
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login