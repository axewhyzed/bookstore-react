import React from "react";
import { TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authService from "../services/auth.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitted:", values);
    authService.login(values).then((res) => {
      toast.success("Successfully Logged In")
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error(error);
      } else {
        toast.error("An error occurred");
      }
    });

    // Reset form submission state
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <Field
                as={TextField}
                type="email"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <Field
                as={TextField}
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
