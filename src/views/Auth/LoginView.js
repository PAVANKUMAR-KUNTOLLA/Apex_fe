import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Avatar,
  MenuItem,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "../../components/CustomAlert";

import * as Yup from "yup";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import Api from "../../components/Api";
import Page from "../../components/Page";
import { setTaxYear } from "../../redux/app/appSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: "0px",
    paddingTop: "0px",
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
  mainBlock: {
    width: "100vw",
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
      marginTop: "-100px",
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

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordState, setForgetPasswordState] = useState({ email: "" });
  const [isResetPasswordSubmitting, setIsRestPasswordSubmitting] =
    useState(false);

  const handleForgotPassword = () => {
    const url = Api.forgotPassword;
    setIsRestPasswordSubmitting(true);
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    axios
      .post(url, forgotPasswordState, config)
      .then((res) => {
        setShowAlert({
          isAlert: true,
          alertText: res.data["message"],
          severity: "success",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      })
      .catch((error) => {
        console.log(error.response);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data["message"],
          severity: "error",
          alertTitle: "Error",
        });
        setIsForgotPassword(false);
        setIsRestPasswordSubmitting(false);
        setForgetPasswordState({ email: "" });
      });
  };

  return (
    <>
      <Page className={classes.root} title="Login">
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
                      email: "",
                      password: "",
                      // taxYear: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Must be a valid email")
                        .max(255)
                        .required("Email is required"),
                      password: Yup.string()
                        .max(255)
                        .required("Password is required"),
                      // taxYear: Yup.string()
                      //   .max(255)
                      //   .required("Tax Year is required"),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      const url = Api.login;

                      const config = {
                        headers: {
                          "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                      };

                      axios
                        .post(url, values, config)
                        .then((res) => {
                          if (res.status === 200) {
                            window.sessionStorage.setItem(
                              "token",
                              res.data?.data?.token
                            );
                            setSubmitting(false);
                            dispatch(setTaxYear(values.taxYear));
                            navigate("/");
                          }
                        })
                        .catch((error) => {
                          if (error.response.status === 400) {
                            setShowAlert({
                              isAlert: true,
                              alertText: "Invalid credentials",
                              severity: "error",
                              alertTitle: "Error",
                            });
                            setSubmitting(false);
                          } else {
                            setShowAlert({
                              isAlert: true,
                              alertText: "Something went wrong",
                              severity: "error",
                              alertTitle: "Error",
                            });
                            resetForm();
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
                        <Box sx={{ margin: "12px 0 24px" }}>
                          <Typography color="textPrimary" variant="h2">
                            Sign in
                          </Typography>
                        </Box>

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
                        {/* <TextField
                        select
                        error={Boolean(touched.taxYear && errors.taxYear)}
                        helperText={touched.taxYear && errors.taxYear}
                        fullWidth
                        label="Tax Year"
                        margin="normal"
                        name="taxYear" // Change "taxyear" to "taxYear"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.taxYear}
                        variant="outlined"
                      >
                        <MenuItem value="currentYear">Current Year</MenuItem>
                        <MenuItem value="AllYears">All Years</MenuItem>
                      </TextField> */}
                        <Box my={2}>
                          <Button
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Sign in now
                          </Button>
                        </Box>
                        {/* <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography> */}
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            color="textSecondary"
                            variant="body1"
                            right={0}
                          >
                            <Link
                              onClick={() => setIsForgotPassword(true)}
                              color="primary"
                              variant="h6"
                            >
                              Forgot Password?
                            </Link>
                          </Typography>
                          <Typography color="textSecondary" variant="body1">
                            Don&apos;t have an account?{" "}
                            <Link
                              component={RouterLink}
                              to="/register"
                              variant="h6"
                            >
                              Sign up
                            </Link>
                          </Typography>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Container>
              </Box>
            </Box>
          </Container>
        </Box>
      </Page>

      <Dialog
        open={isForgotPassword}
        onClose={() => setIsForgotPassword(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to reset password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="off"
            value={forgotPasswordState.email}
            onChange={(e) => setForgetPasswordState({ email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsForgotPassword(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleForgotPassword}
            color="primary"
            disabled={isResetPasswordSubmitting}
          >
            Reset Password
            {isResetPasswordSubmitting && (
              <CircularProgress size={24} className={classes.submitProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginView;
