import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";

import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    position: "relative",
  },

  logo: {
    width: 150,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: 110,
    },
  },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  logoAvatar: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "auto",
      marginTop: "15px",
      marginBottom: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "150px",
    },
  },
}));

const ResetPasswordView = ({ match }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Page className={classes.root} title="Reset Password">
      {showAlert.isAlert ? (
        <CustomAlert
          open={showAlert.isAlert}
          severity={showAlert.severity}
          alertTitle={showAlert.alertTitle}
          alertText={showAlert.alertText}
          onClose={() =>
            setShowAlert({
              isAlert: false,
              alertTitle: "",
              alertText: "",
              severity: "",
            })
          }
        />
      ) : null}
      <Box>
        <Container maxWidth="md">
          {/* <Box className={classes.leftSide}>
            <Avatar
              variant="square"
              src="/static/img/onecall-logo.png"
              className={classes.avatarLogo}
            />
          </Box> */}

          <Box
            // className={classes.rightSide}
            sx={{
              minWidth: "350px",
              maxWidth: { xs: "350px", sm: "500px" },
              minHeight: "450px",
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: "4px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              margin: "15% auto 0",
              padding: "24px",
            }}
          >
            <Avatar
              variant="square"
              src="/static/img/apexlogo.png"
              sx={{
                // flexGrow: 1,
                height: 60,
                width: 170,
              }}
              className={classes.logoAvatar}
            />
            <Formik
              initialValues={{
                password: "",
                passwordConfirmation: "",
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required("Please enter your password")
                  .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                  ),

                passwordConfirmation: Yup.string().when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                  ),
                }),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const url = Api.resetPassword;

                let data = {
                  password: values["password"],
                  uidb64: params.uidb64,
                  token: params.token,
                };

                const config = {
                  headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                  },
                };

                axios
                  .post(url, data, config)
                  .then((res) => {
                    const { status, data } = res;
                    if (status === 200) {
                      setSubmitting(false);
                      setShowAlert({
                        isAlert: true,
                        alertText: data?.["message"],
                        severity: "success",
                      });
                      resetForm();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setSubmitting(false);
                    setShowAlert({
                      isAlert: true,
                      alertText: "Something went wrong",
                      severity: "error",
                      alertTitle: "Error",
                    });
                    resetForm();
                  });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Reset Password
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.passwordConfirmation &&
                        errors.passwordConfirmation
                    )}
                    fullWidth
                    helperText={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    label="Confirm Password"
                    margin="normal"
                    name="passwordConfirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirmation}
                    variant="outlined"
                  />

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Reset Password
                      {isSubmitting && (
                        <CircularProgress
                          size={24}
                          className={classes.submitProgress}
                        />
                      )}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Go back to{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ResetPasswordView;
