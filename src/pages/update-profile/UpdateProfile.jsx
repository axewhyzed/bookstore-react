import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { AuthContext, useAuthContext } from "../../context/auth.context";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import userService from "../../services/user.service";
import { toast } from "react-toastify";
import shared from "../../utils/shared";
import { useNavigate } from "react-router-dom";
import { editStyle } from "./style";

const UpdateProfile = () => {
  const authContext = useAuthContext();
  const classes = editStyle();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const initialValueState = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    newPassword: "",
    confirmPassword: "",
  };

  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 characters are required"),
    confirmPassword: updatePassword
      ? Yup.string()
          .required("Must be required")
          .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords do not match"),
  });

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : user.password;
    delete values.confirmPassword;
    delete values.newPassword;

    const data = Object.assign(user, { ...values, password });
    delete data._id;
    delete data.__v;
    const res = await userService.updateProfile(data);
    if (res) {
      authContext.setUser(res);
      toast.success(shared.messages.UPDATED_SUCCESS);
      navigate("/");
    }
  };

  return (
    <Container maxWidth="md" className={classes.editWrapper}>
      <Typography variant="h3" align="center">
        Update Profile
      </Typography>
      <br />
      <Formik
        initialValues={initialValueState}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validator={() => ({})}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="first-name"
                  name="firstName"
                  label="First Name *"
                  variant="outlined"
                  fullWidth
                  value={values.firstName}
                  inputProps={{ className: classes.inputSmall }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ValidationErrorMessage
                  message={errors.firstName}
                  touched={touched.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="last-name"
                  name="lastName"
                  label="Last Name *"
                  variant="outlined"
                  fullWidth
                  value={values.lastName}
                  inputProps={{ className: classes.inputSmall }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ValidationErrorMessage
                  message={errors.lastName}
                  touched={touched.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email *"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  inputProps={{ className: classes.inputSmall }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ValidationErrorMessage
                  message={errors.email}
                  touched={touched.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  value={values.newPassword}
                  inputProps={{ className: classes.inputSmall }}
                  onChange={(e) => {
                    e.target.value !== ""
                      ? setUpdatePassword(true)
                      : setUpdatePassword(false);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                />
                <ValidationErrorMessage
                  message={errors.newPassword}
                  touched={touched.newPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  value={values.confirmPassword}
                  inputProps={{ className: classes.inputSmall }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ValidationErrorMessage
                  message={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </Grid>
            </Grid>
            <div className={classes.btnWrapper}>
              <Button
                className={`${classes.btn} ${classes.greenBtn}`}
                variant="contained"
                type="submit"
                color="primary"
                disableElevation
                fullWidth
              >
                Save
              </Button>
              <Button
                className={`${classes.btn} ${classes.pinkBtn}`}
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default UpdateProfile;
