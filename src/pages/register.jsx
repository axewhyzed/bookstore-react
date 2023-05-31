import React from "react";
import "../App.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import authService from "../services/auth.service";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../utils/enum";
import { NavLink } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  roleId: Yup.number().required("Role is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    delete values.confirmPassword;
    console.log("Submitted:", values);
    authService
      .create(values)
      .then((res) => {
        toast.success("Successfully Registered");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error(error);
        } else {
          toast.error("An error occurred");
        }
      });
  };

  return (
    <div className="register-page">
      <div className="register-advert">
        <ul>
          <h3>Unlock the World of Reading Delights!</h3>
          <h5>
            Register now and become a member of our vibrant book-loving
            community. Experience a personalized and enriching reading journey
            like never before.
          </h5>
          <h6>Benefits of Registering</h6>
          <li>
            📖 Personalized Book Recommendations: Discover books tailored to
            your unique reading preferences.
          </li>
          <li>
            💰 Exclusive Discounts: Enjoy special discounts and promotions
            available only to registered members.
          </li>
          <li>
            🚀 Early Access to New Releases: Get a head start on the latest book
            releases before they hit the shelves.
          </li>
          <li>
            📚 Member-Only Events: Participate in exclusive book clubs, author
            signings, and engaging literary discussions.
          </li>
          <li>
            📝 Create Reading Lists: Save your favorite books, create reading
            lists, and keep track of your reading progress.
          </li>
        </ul>
      </div>
      <div className="register-form">
        <center>
          <h1>Register</h1>
        </center>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="register-grouping">
              <div className="form-group">
                <Field
                  as={TextField}
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <Field
                  as={TextField}
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="register-grouping">
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
                <InputLabel>Roles</InputLabel>
                <div>
                  <Field
                    as={Select}
                    id="roleId"
                    name="roleId"
                    label="Roles"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  >
                    <MenuItem value={2}>Seller</MenuItem>
                    <MenuItem value={3}>Buyer</MenuItem>
                  </Field>
                </div>
                <ErrorMessage name="roleId" component="div" className="error" />
              </div>
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

            <div className="form-group">
              <Field
                as={TextField}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="dense"
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
        <p>
          Returning user? Head to the login page to revisit your favorite books
          and explore new ones!
        </p>
        <NavLink to={RoutePaths.Login}>Click here to Login</NavLink>
      </div>
    </div>
  );
};

export default Register;
