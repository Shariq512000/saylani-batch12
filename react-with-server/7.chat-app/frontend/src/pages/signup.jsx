import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';
import api from '../component/api';

const Signup = () => {
    let {state} = useContext(GlobalContext);
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()

    const registerUser = async(e) => {
        e.preventDefault();
        try {
            let res = await api.post(`/sign-up`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            console.log(res.data);
            alert(res.data.message);
            navigate('/login')

        } catch (error) {
            console.log("Error" , error);
            alert(error.response.data.message)
        }
        
    }
  return (
    <div>
        <form onSubmit={registerUser}>
            <label htmlFor="">
                First Name:
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Last Name:
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
            </label>
            <br />
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
        <p><Link to={'/login'}>Login</Link></p>
    </div>
  )
}

export default Signup