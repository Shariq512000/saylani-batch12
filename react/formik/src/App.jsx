import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const App = () => {

const customValidation = yup.object({
  firstName: yup
    .string('Enter a Valid Name')
    .required('Name is Required'),
  lastName: yup
    .string('Enter a Valid Name')
    .required('Name is Required'),
  email: yup
    .string('Enter a Valid Name')
    .email('enter a valid email')
    .required('email is Required'),
  password: yup
    .string('Enter Password')
    .required('Password is Required')
    .min(6, "Minimum")
    .max(12, "Maximum 12 Character"),
});

const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  validationSchema: customValidation,
  onSubmit: (values) => {
    console.log("values" , values);
    formik.resetForm();
  },
});

  return(
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 50}}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          name="firstName"
          label="First Name: "
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        {/* <input type="text" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} /> */}

        {
          (formik.touched.firstName && Boolean(formik.errors.firstName)) ?
            <p style={{ color: "red" }}>{formik.touched.firstName && formik.errors.firstName}</p>
            :
            null
        }


        <br />
        <br />

        <TextField
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          label="Last Name: "
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <br />
        <br />

        <TextField
          name="email"
          label="Email: "
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <br />
        <br />

        <TextField
          name="password"
          label="Password: "
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <br />
        <div className="" style={{display: "flex", justifyContent: "center"}}>
          <Button color="primary" variant="outlined" type="submit">
            Signup
          </Button>
        </div>
      </form>
    </div>
  )
}

export default App;