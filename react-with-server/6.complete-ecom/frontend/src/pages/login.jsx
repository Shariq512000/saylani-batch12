import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';
import api from '../component/api';

const Login = () => {

    let {state, dispatch} = useContext(GlobalContext);

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()

    const loginUser = async(e) => {
        e.preventDefault();
        try {
            let res = await api.post(`/login`, {
                email: email,
                password: password
            })
            console.log(res.data);
            alert(res.data.message);
            dispatch({type: "USER_LOGIN", user: res.data.user})
            setTimeout(() => {
                navigate('/home')
            } , 1000)

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
            <br />
            <p><Link to={'/sign-up'}>Sign up</Link></p>
        </form>
    </div>
  )
}

export default Login