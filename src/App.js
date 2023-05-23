import React from 'react';
import './App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography } from '@material-ui/core';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const App = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="App">
      <Typography variant="h4" component="h1" align="center">
        Registration Form
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <div className="form-group">
            <Field
              as={TextField}
              type="text"
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              as={TextField}
              type="email"
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
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
              margin="normal"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              as={TextField}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default App;
