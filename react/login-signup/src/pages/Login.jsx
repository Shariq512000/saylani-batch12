import { Alert, Button, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup";
import { useNavigate } from 'react-router';

const Login = () => {

    const [alertOpen , setAlertOpen] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");

    const navigate = useNavigate();

    const alertClose = () => {
        setAlertOpen(false)
    }

    const loginValidation = yup.object({
        userName: yup.string("User Must Be String").required("User Name is Required"),
        password: yup.string().required("Password is Required").matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$" , "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    })

    const loginFormik = useFormik({
        initialValues: {
            userName:'',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: (values) => {
            axios.post("https://dummyjson.com/auth/login", {username: values.userName, password: values.password})
            .then((response) => {
                console.log("Res : " , response);
                navigate("/home");
            })
            .catch((error) => {
                console.log("Error" , error);
                setErrorMessage(error.response?.data?.message)
                setAlertOpen(true);
            })
        }
    })

    return (
        <div>
            <form onSubmit={loginFormik.handleSubmit}>
                <div className="" style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 50}}>
                    <TextField
                        name="userName"
                        label="User Name: "
                        value={loginFormik.values.userName}
                        onChange={loginFormik.handleChange}
                        error={loginFormik.touched.userName && Boolean(loginFormik.errors.userName)}
                        helperText={loginFormik.touched.userName && loginFormik.errors.userName}
                    />


                    <br />
                    <br />

                    <TextField
                        name="password"
                        label="Password: "
                        type="password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                        helperText={loginFormik.touched.password && loginFormik.errors.password}
                    />
                    <br />
                    <div className="" style={{display: "flex", justifyContent: "center"}}>
                        <Button color="primary" variant="outlined" type="submit">
                            Login
                        </Button>
                    </div>

                    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={alertClose} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}>
                        <Alert onClose={alertClose} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>

                </div>
            </form>
        </div>
    )
}

export default Login