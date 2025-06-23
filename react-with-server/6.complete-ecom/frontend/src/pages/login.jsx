import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()

    const loginUser = async(e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5004/login', {
                email: email,
                password: password
            })
            console.log(res.data);
            alert(res.data.message);
            navigate('/home')

        } catch (error) {
            console.log("Error" , error);
            alert(error.response.data.message)
        }
        
    }
  return (
    <div>
        <form onSubmit={loginUser}>
            <label htmlFor="">
                Email:
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Password:
                <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </label>
            <br />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login