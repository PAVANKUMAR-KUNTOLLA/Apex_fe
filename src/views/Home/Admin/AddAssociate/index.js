import React, { useState } from "react";
import Page from "../../../../components/Page";
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Api from "../../../../components/Api";
import { privateApiPOST } from "../../../../components/PrivateRoute";
import CustomInputTextField from "../../../../components/CustomInputField";
import CustomAlert from "../../../../components/CustomAlert";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  associateCode: "",
  password: "",
  uploadDocsView: false,
  manageAppointment: false,
  role: "ADMIN",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string().required("Contact number is required"),
  password: Yup.string().required("Password is required"),
  associateCode: Yup.string().required("Associate Code is required"),
  uploadDocsView: Yup.string().required("Upload Docs View is required"),
  manageAppointment: Yup.string().required("Manage Appointment is required"),
});

const AddAssociatePage = () => {
  const [isLoadingSpin, setIsLoadingSpin] = useState(false);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  return (
    <Box>
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
      <Typography
        variant="h3"
        sx={{
          padding: "20px",
          backgroundColor: "#DDDDDD",
        }}
      >
        Add Associate
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: { sm: "30px", xs: "0" },
          paddingTop: { xs: "30px" },
          paddingBottom: { xs: "20px" },
          bgcolor: "#ffffff",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderRadius: "6px",
          // boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
          overflow: "hidden",
          color: "#333333",
          backgroundImage: "none",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setIsLoadingSpin(true);
            setSubmitting(true);
            let payload = { ...values };
            privateApiPOST(Api.signup, payload)
              .then((response) => {
                const { status, data } = response;
                if (status === 200) {
                  console.log("data", data?.data);
                  setShowAlert({
                    isAlert: true,
                    alertText: data?.message,
                    severity: "success",
                  });
                  resetForm();
                }
                setSubmitting(false);
                setIsLoadingSpin(false);
              })
              .catch((error) => {
                console.log("Error", error);
                if (
                  error.response.status === 400 ||
                  error.response.status === 401
                ) {
                  setShowAlert({
                    isAlert: true,
                    alertText: error.response.data?.message,
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
                setIsLoadingSpin(false);
              });
          }}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
                <Grid
                  container
                  sx={{
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="First Name"
                      margin="normal"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.firstName}
                      variant="outlined"
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="Last Name"
                      margin="normal"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.lastName}
                      variant="outlined"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="Email Id"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.email}
                      variant="outlined"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="Contact No"
                      margin="normal"
                      name="contact"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.contact}
                      variant="outlined"
                      error={Boolean(touched.contact && errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="Associate Code"
                      margin="normal"
                      name="associateCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.associateCode}
                      variant="outlined"
                      error={Boolean(
                        touched.associateCode && errors.associateCode
                      )}
                      helperText={touched.associateCode && errors.associateCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} sx={{ marginRight: "20px" }}>
                    <CustomInputTextField
                      attribute="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.password}
                      variant="outlined"
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={5}
                    sx={{ marginRight: "20px", marginTop: "24px" }}
                  >
                    <Grid container>
                      <Grid item xs={10} sm={6}>
                        <Typography variant="body1">
                          Upload Docs View :
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={3}>
                        <select
                          id="uploadDocsView"
                          name="uploadDocsView"
                          value={values.uploadDocsView}
                          onChange={handleChange}
                          style={{ width: "100%" }}
                        >
                          <option value="">Select</option>
                          {/* Add an empty option */}
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    sx={{ marginRight: "20px", marginTop: "24px" }}
                  >
                    <Grid container>
                      <Grid item xs={10} sm={6}>
                        <Typography variant="body1">
                          Manage Appointemnt :
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={3}>
                        <select
                          id="manageAppointment"
                          name="manageAppointment"
                          value={values.manageAppointment}
                          onChange={handleChange}
                          style={{ width: "100%" }}
                        >
                          <option value="">Select</option>
                          {/* Add an empty option */}
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center" // Center horizontally
                  alignItems="center" // Center vertically
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      paddingBottom: { xs: "20px" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoadingSpin}
                      sx={{
                        marginRight: { xs: "0px", sm: "130px" },
                      }}
                    >
                      Create Associate{"  "}
                      {isLoadingSpin && (
                        <CircularProgress
                          size={15}
                          color="primary"
                          sx={{ marginLeft: "15px" }}
                        />
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddAssociatePage;
