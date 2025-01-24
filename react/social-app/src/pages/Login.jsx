import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword  } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
            <div className="d-flex">
                <p className='text-underline' onClick={() => {setShow(true)}} style={{textDecoration: "underline", cursor: "pointer"}}>Forgot Password</p>
            </div>
            <button>Login</button>
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