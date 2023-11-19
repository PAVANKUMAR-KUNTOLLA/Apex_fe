import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Avatar,
  MenuItem,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";
import PerfectScrollbar from "react-perfect-scrollbar";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
  },
  alert: {
    position: "absolute",
    right: 50,
    top: 50,
    [theme.breakpoints.down("sm")]: {
      right: 20,
      maxWidth: 250,
    },
  },
  logo: {
    width: 100,
  },
  menuPaper: {
    maxHeight: 200,
  },
  mainBlock: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSide: {
    width: "70%",
    height: "100vh",
    position: "relative",
    backgroundColor: "#2069D8",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40vh",
      margin: "0",
    },
  },

  avatarLogo: {
    width: 200,
    height: 72,
    position: "absolute",
    top: "50%",
    left: "33%",
    [theme.breakpoints.down("sm")]: {
      left: "20%",
      top: "30%",
    },
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "72px",
    textAlign: "center",
    lineHeight: "87.7px",
    color: "#FFFFFF",
    margin: "auto",
    marginTop: "50vh",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10vh",
    },
  },

  rightSide: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    margin: "0",
    paddingRight: "200px",
    padding: "0", // Reset padding
    [theme.breakpoints.up("md")]: {
      paddingLeft: "244px", // Adjust padding for medium and larger screens
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Set width to 100%
      paddingLeft: "0", // Reset padding
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      paddingRight: "0px",
    },
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

const RegisterView = () => {
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Page className={classes.root} title="Register">
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
              maxWidth: { xs: "350px", sm: "650px" },
              minHeight: "450px",
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: "4px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              margin: "10% auto 0",
              padding: "24px",
            }}
          >
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

            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <PerfectScrollbar>
                <Container maxWidth="sm">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={2}
                  >
                    {/* We can place our logo here */}
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
                  </Box>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      gender: "",
                      email: queryParams.get("email"),
                      password: "",
                      passwordConfirmation: "",
                      referralId: queryParams.get("referralId"),
                    }}
                    validationSchema={Yup.object().shape({
                      firstName: Yup.string()
                        .max(255)
                        .required("First Name is required"),
                      lastName: Yup.string()
                        .max(255)
                        .required("Last Name is required"),
                      gender: Yup.string().required("Gender is required"),
                      email: Yup.string()
                        .email("Must be a valid email")
                        .max(255)
                        .required("Email is required"),

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
                      const url = Api.signup;

                      const config = {
                        headers: {
                          "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                      };

                      axios
                        .post(url, values, config)
                        .then((res) => {
                          if (res.status === 200) {
                            setShowAlert({
                              isAlert: true,
                              alertText: "Your are successfully registered.",
                              severity: "success",
                            });
                            setSubmitting(false);
                            resetForm();
                          }
                        })
                        .catch((error) => {
                          if (error.response) {
                            const { data } = error.response;
                            setShowAlert({
                              isAlert: true,
                              alertText: data?.["message"],
                              severity: "error",
                              alertTitle: "Error",
                            });
                            // resetForm();
                            setSubmitting(false);
                          }
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
                            Register
                          </Typography>
                        </Box>
                        <TextField
                          error={Boolean(touched.firstName && errors.firstName)}
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
                          label="First Name"
                          margin="normal"
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.lastName && errors.lastName)}
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
                          label="Last Name"
                          margin="normal"
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.gender && errors.gender)}
                          select
                          fullWidth
                          helperText={touched.gender && errors.gender}
                          label="Gender"
                          margin="normal"
                          name="gender"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.gender}
                          variant="outlined"
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label="Email Address"
                          margin="normal"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />

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
                        <TextField
                          error={Boolean(
                            touched.referralId && errors.referralId
                          )}
                          fullWidth
                          helperText={touched.referralId && errors.referralId}
                          label="Referral Id (Optional)"
                          margin="normal"
                          name="referralId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.referralId}
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
                            Sign up
                          </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body1">
                          Have an account?{" "}
                          <Link component={RouterLink} to="/login" variant="h6">
                            Sign in
                          </Link>
                        </Typography>
                      </form>
                    )}
                  </Formik>
                </Container>
              </PerfectScrollbar>
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
