import React from "react";
import "../../App.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import "./registerStyles.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListItem,
  List,
} from "@material-ui/core";
import authService from "../../services/auth.service";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../../utils/enum";
import { Link,useNavigate } from "react-router-dom";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";

const Register = () => {
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

  const materialClasses = materialCommonStyles();

  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    password: "",
    confirmPassword: "",
  };
  const roleList = [
    { id: 2, name: "buyer" },
    { id: 3, name: "seller" },
  ];

  const onSubmit = (data) => {
    delete data.confirmPassword;
    authService.create(data).then((res) => {
      navigate("/login");
      toast.success("Successfully registered");
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
              <div className="form-block">
                <List>
                  <ListItem>
                    <div className="form-col">
                      <TextField
                        id="first-name"
                        name="firstName"
                        label="First Name *"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ValidationErrorMessage
                        message={errors.firstName}
                        touched={touched.firstName}
                      />
                    </div>
                    <div className="form-col">
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="last-name"
                        name="lastName"
                        label="Last Name *"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                      />
                      <ValidationErrorMessage
                        message={errors.lastName}
                        touched={touched.lastName}
                      />
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="form-col">
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        label="Email Address *"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                      />
                      <ValidationErrorMessage
                        message={errors.email}
                        touched={touched.email}
                      />
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="form-col">
                      <FormControl
                        className="dropdown-wrapper"
                        variant="outlined"
                      >
                        <InputLabel htmlFor="select">Roles</InputLabel>
                        <Select
                          name="roleId"
                          id={"roleId"}
                          inputProps={{ className: "small" }}
                          onChange={handleChange}
                          className={materialClasses.customSelect}
                          MenuProps={{
                            classes: {
                              paper: materialClasses.customSelect,
                            },
                          }}
                          value={values.roleId}
                        >
                          {roleList.length > 0 &&
                            roleList.map((role) => (
                              <MenuItem value={role.id} key={"name" + role.id}>
                                {role.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="form-col">
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="password"
                        type="password"
                        name="password"
                        label="Password *"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                      />
                      <ValidationErrorMessage
                        message={errors.password}
                        touched={touched.password}
                      />
                    </div>
                    <div className="form-col">
                      <TextField
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="confirm-password"
                        name="confirmPassword"
                        label="Confirm Password *"
                        variant="outlined"
                        inputProps={{ className: "small" }}
                      />
                      <ValidationErrorMessage
                        message={errors.confirmPassword}
                        touched={touched.confirmPassword}
                      />
                    </div>
                  </ListItem>
                  <div className="btn-wrapper">
                    <Button
                      className="pink-btn btn"
                      variant="contained"
                      type="submit"
                      color="primary"
                      disableElevation
                    >
                      Register
                    </Button>
                  </div>
                </List>
              </div>
            </form>
          )}
        </Formik>
        <p>
          Returning user? Head to the login page to revisit your favorite books
          and explore new ones!<br />
        </p>
        <Link to={RoutePaths.Login}><Button style={{border: "1px solid black"}}>Click here to Login</Button></Link>
      </div>
    </div>
  );
};

export default Register;
