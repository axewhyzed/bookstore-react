import React from "react";
import { TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authService from "../services/auth.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutePaths } from "../utils/enum";
import { useAuthContext } from "../context/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

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
    authService
      .login(values)
      .then((res) => {
        authContext.setUser(res);
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
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
      <div className="login-advert">
        <ul>
          <h4>Welcome Back! Log in to Your Account</h4>
          <h6>📚 Continue Your Reading Adventure 📚</h6>
          <li>
            🌟 Discover New Releases: Stay up-to-date with the latest book
            releases and literary gems.
          </li>
          <li>
            📖 Expand Your Horizons: Explore diverse genres, authors, and
            captivating narratives.
          </li>
          <li>
            🗂️ Personalize Your Library: Tailor your reading collection with
            your favorite books and genres.
          </li>
          <li>
            💬 Engage with Fellow Readers: Connect with a passionate community
            of book lovers, share recommendations, and ignite discussions.
          </li>
          <li>
            🎉 Exclusive Surprises: Unlock member-exclusive events, giveaways,
            and exciting surprises.
          </li>
        </ul>
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="register-form-group">
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
        <br />
        <p>
          New to our bookstore? Start your reading journey by creating an
          account!
        </p>
        <NavLink to={RoutePaths.Register}>Click here to Register</NavLink>
      </div>
    </div>
  );
};

export default Login;
