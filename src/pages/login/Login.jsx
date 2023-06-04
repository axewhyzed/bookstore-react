import React from "react";
import { TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import * as Yup from "yup";
import './loginStyles.css'
import authService from "../../services/auth.service";
import { Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate} from "react-router-dom";
import { RoutePaths } from "../../utils/enum";
import { useAuthContext } from "../../context/auth.context";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";

const Login = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be more than 5 charector")
      .required("Password is required."),
  });

  const onSubmit = (data) => {
    authService.login(data).then((res) => {
      toast.success("Login successfully");
      authContext.setUser(res);
      navigate('/');
    });
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
          onSubmit={onSubmit}
        >
          {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                  <div className="form-row-wrapper">
                    <div className="form-col">
                      <TextField
                        id="email"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email Address *"
                        autoComplete="off"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                      />
                      <ValidationErrorMessage
                        message={errors.email}
                        touched={touched.email}
                      />
                    </div>
                    <div className="form-col">
                      <TextField
                        id="password"
                        name="password"
                        label="Password *"
                        type="password"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ className: "small" }}
                        autoComplete="off"
                      />
                      <ValidationErrorMessage
                        message={errors.password}
                        touched={touched.password}
                      />
                    </div>
                    <div className="btn-wrapper">
                      <Button
                        type="submit"
                        className="pink-btn btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </form>
                )}
        </Formik>
        <br />
        <p>
          New to our bookstore? Start your reading journey by creating an
          account!
        </p>
        <Link to={RoutePaths.Register}><Button style={{border: "1px solid black"}}>Click here to Register</Button></Link>
      </div>
    </div>
  );
};

export default Login;
