import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';

const Login = () => {

    let {state, dispatch} = useContext(GlobalContext);
    console.log(state)
    const [isShow , setIsShow] = useState(false);

    const navigate = useNavigate();

    const loginValidation = yup.object({
        userName: yup.string("User Must Be String").required("User Name is Required"),
        password: yup.string()
        .required("Password is Required")
        // .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$" , "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    })

    const loginFormik = useFormik({
        initialValues:{
            userName: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: (values) => {
            // console.log("values" , values);
            axios.post("https://dummyjson.com/auth/login", {username: values.userName, password: values.password})
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token" , res.data?.accessToken)
                dispatch({type: "USER_LOGIN", user: res.data})
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
            })
        }

    })

  return (
    <div className='flex justify-center pt-12 bg-gradient-to-r from-ali-300 to-red-500'>
        <div className="w-[520px] bg-white md:bg-gray-700 p-5 rounded-md shadow-xl border">
            <form onSubmit={loginFormik.handleSubmit}>
                <label htmlFor="userName" className='flex md:flex-row items-center gap-x-3 flex-col'>
                    <span>User Name: </span>
                    <input type="text" className='border px-3 py-1 text-lg' id='userName' name='userName' value={loginFormik.values.userName} onChange={loginFormik.handleChange} />
                </label>
                {
                    (loginFormik.touched.userName && Boolean(loginFormik.errors.userName)) ?
                        <span style={{ color: "red" }}>{loginFormik.errors.userName}</span>
                        :
                        null
                }

                <br />
                <label htmlFor="password" className='flex md:flex-row flex-col items-center gap-x-3'>
                    <span>Password:</span> <input className='border px-3 py-1 text-lg' type={isShow ? "text" : "password"} id='password' name='password' value={loginFormik.values.password} onChange={loginFormik.handleChange} />
                </label>
                <span style={{display: "inline-block", cursor: "pointer"}} onClick={() => {setIsShow(!isShow)}}>{isShow? "Hide" : "Show"}</span>
                <br />
                {
                    (loginFormik.touched.password && Boolean(loginFormik.errors.password)) ?
                        <span style={{ color: "red" }}>{loginFormik.errors.password}</span>
                        :
                        null
                }
                <br />
                <div className="flex justify-center">
                    <button type="submit" className='bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-700 transition-all duration-500'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login