import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {

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
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
            })
        }

    })

  return (
    <div>
        <form onSubmit={loginFormik.handleSubmit}>
            <label htmlFor="userName">
                User Name: <input type="text" id='userName' name='userName' value={loginFormik.values.userName} onChange={loginFormik.handleChange} />
            </label>
            <br />
            {
                (loginFormik.touched.userName && Boolean(loginFormik.errors.userName)) ?
                    <span style={{ color: "red" }}>{loginFormik.errors.userName}</span>
                    :
                    null
            }

            <br />
            <label htmlFor="password">
                Password: <input type={isShow ? "text" : "password"} id='password' name='password' value={loginFormik.values.password} onChange={loginFormik.handleChange} />
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

            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login