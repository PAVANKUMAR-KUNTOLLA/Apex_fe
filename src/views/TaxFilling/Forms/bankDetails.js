import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import Api from "../../../components/Api";
import { privateApiPOST } from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";

const validationSchema = Yup.object().shape({
  bankingType: Yup.string().required("Banking Type is required"),
  bankName: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Bank Name is required"),
  }),
  accountHolderName: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Holder Name is required"),
  }),
  ownership: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Ownership is required"),
  }),
  routingNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .matches(/^\d{9}$/, "Routing Number must be a valid 9-digit number")
      .required("Routing Number is required"),
  }),
  confirmRoutingNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Routing Number is required")
      .oneOf([Yup.ref("routingNumber"), null], "Routing Numbers must match"),
  }),
  accountNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Number is required"),
  }),
  confirmAccountNumber: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Account Number is required")
      .oneOf([Yup.ref("accountNumber"), null], "Account Numbers must match"),
  }),
  accountType: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string().required("Account Type is required"),
  }),
  confirmAccountType: Yup.string().when("bankingType", {
    is: "PAPER CHECK",
    then: Yup.string(),
    otherwise: Yup.string()
      .required("Confirm Account Type is required")
      .oneOf([Yup.ref("accountType"), null], "Account Types must match"),
  }),
});

const BankDetails = ({ open, id, data, handleFetchData }) => {
  const [isBankDetailsLoading, setIsBankDetailsLoading] = useState(false);

  const initialValues = {
    bankingType: data["bankingType"],
    bankName: data["bankName"],
    accountHolderName: data["accountHolderName"],
    ownership: data["ownership"],
    routingNumber: data["routingNumber"],
    confirmRoutingNumber: data["confirmRoutingNumber"],
    accountNumber: data["accountNumber"],
    confirmAccountNumber: data["confirmAccountNumber"],
    accountType: data["accountType"],
    confirmAccountType: data["confirmAccountType"],
  };

  return (
    <Box
      sx={{
        padding: "20px 30px 5px",
        border: { xs: "none", sm: "none" },
        minHeight: { xs: "auto", sm: "800px" },
      }}
    >
      {isBankDetailsLoading ? (
        <CircularProgress />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setIsBankDetailsLoading(true);
            setSubmitting(true);
            let payload = { ...values, id: id };
            privateApiPOST(Api.bankDetails, payload)
              .then((response) => {
                const { status, data } = response;
                if (status === 200) {
                  console.log("data", data);
                  setIsBankDetailsLoading(false);
                  handleFetchData();
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                console.log("Error", error);
                setIsBankDetailsLoading(false);
                setSubmitting(false);
              });
          }}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
                <Box
                  width="98%"
                  align="left"
                  sx={{
                    border: "1px solid #000000",
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <fieldset>
                    <legend>Bank Details</legend>
                    <br />
                    <Typography
                      color="brown"
                      variant="h4"
                      sx={{ marginTop: "10px" }}
                    >
                      <b>Important Note</b>
                    </Typography>
                    <Typography
                      align="justify"
                      sx={{ marginTop: "5px", wordSpacing: "3px" }}
                    >
                      The IRS and certain State Revenue Departments facilitate
                      DIRECT DEPOSIT / WITHDRAWAL of Tax Refund or Tax Dues on
                      the Tax Returns. If you are interested in availing this
                      option, we request you to kindly input the following
                      details. You may also provide multiple bank accounts for
                      IRS to direct deposit your Tax Refund in different
                      accounts.
                    </Typography>
                    <br />
                    <br />
                  </fieldset>
                </Box>
                <Grid
                  container
                  sx={{ marginBottom: "30px", marginTop: "30px" }}
                >
                  <Grid
                    item
                    xs={10}
                    sm={4}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="body1">
                      I prefer to receive my tax refunds by way of
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sm={4}>
                    <select
                      id="bankingType"
                      name="bankingType"
                      value={values.bankingType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "100%" }}
                    >
                      <option value="">Select Option</option>
                      <option value="DIRECT DEPOSIT INTO MY BANK ACCOUNT">
                        Direct deposit into my bank account
                      </option>
                      <option value="PAPER CHECK">Paper Check</option>
                    </select>
                    {touched.bankingType && errors.bankingType && (
                      <div className="error">{errors.bankingType}</div>
                    )}
                  </Grid>
                  <Grid>
                    {" "}
                    <Typography
                      variant="h5"
                      sx={{ marginTop: "30px", marginLeft: "15px" }}
                    >
                      Bank Account Information
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: "30px",
                        marginLeft: "15px",
                        color: "red",
                      }}
                    >
                      Note: Please understand that there is no risk by entering
                      Bank Account and Routing Numbers
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* Additional Fields for Direct Deposit */}

              <Grid>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    border: "1px solid #000000",
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#C7DFF0",
                  }}
                >
                  <Grid item lg={6} sm={6} xs={12}>
                    <CustomInputTextField
                      attribute="Bank Name"
                      is_required={false}
                      margin="normal"
                      name="bankName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.bankName}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(touched.bankName && errors.bankName)}
                      helperText={touched.bankName && errors.bankName}
                    />
                    <CustomInputTextField
                      attribute="Account Number"
                      is_required={false}
                      margin="normal"
                      name="accountNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.accountNumber}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.accountNumber && errors.accountNumber
                      )}
                      helperText={touched.accountNumber && errors.accountNumber}
                    />

                    <CustomInputTextField
                      attribute="Routing Number"
                      is_required={false}
                      margin="normal"
                      name="routingNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.routingNumber}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.routingNumber && errors.routingNumber
                      )}
                      helperText={touched.routingNumber && errors.routingNumber}
                    />
                    <CustomInputTextField
                      attribute="Account Type"
                      is_required={false}
                      margin="normal"
                      name="accountType"
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.accountType}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(touched.accountType && errors.accountType)}
                      helperText={touched.accountType && errors.accountType}
                    >
                      <MenuItem value="SAVINGS">Savings</MenuItem>
                      <MenuItem value="CHECKING">Checking</MenuItem>
                    </CustomInputTextField>
                    <CustomInputTextField
                      attribute="Ownership"
                      is_required={false}
                      margin="normal"
                      name="ownership"
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.ownership}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(touched.ownership && errors.ownership)}
                      helperText={touched.ownership && errors.ownership}
                    >
                      <MenuItem value="TAXPAYER/SPOUSE">
                        Tax Payer / Spouse
                      </MenuItem>
                      <MenuItem value="JOINT">Joint</MenuItem>
                    </CustomInputTextField>
                  </Grid>
                  <Grid item lg={6} sm={6} xs={12}>
                    <CustomInputTextField
                      attribute="Account Holder Name"
                      is_required={false}
                      margin="normal"
                      name="accountHolderName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.accountHolderName}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.accountHolderName && errors.accountHolderName
                      )}
                      helperText={
                        touched.accountHolderName && errors.accountHolderName
                      }
                    />

                    <CustomInputTextField
                      attribute="Confirm Account Number"
                      is_required={false}
                      margin="normal"
                      name="confirmAccountNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.confirmAccountNumber}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.confirmAccountNumber &&
                          errors.confirmAccountNumber
                      )}
                      helperText={
                        touched.confirmAccountNumber &&
                        errors.confirmAccountNumber
                      }
                    />
                    <CustomInputTextField
                      attribute="Confirm Routing Number"
                      is_required={false}
                      margin="normal"
                      name="confirmRoutingNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      value={values.confirmRoutingNumber}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.confirmRoutingNumber &&
                          errors.confirmRoutingNumber
                      )}
                      helperText={
                        touched.confirmRoutingNumber &&
                        errors.confirmRoutingNumber
                      }
                    />
                    <CustomInputTextField
                      attribute="Confirm Account Type"
                      is_required={false}
                      margin="normal"
                      name="confirmAccountType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                      fullWidth
                      value={values.confirmAccountType}
                      variant="outlined"
                      disabled={values.bankingType === "PAPER CHECK"}
                      error={Boolean(
                        touched.confirmAccountType && errors.confirmAccountType
                      )}
                      helperText={
                        touched.confirmAccountType && errors.confirmAccountType
                      }
                    >
                      <MenuItem value="SAVINGS">Savings</MenuItem>
                      <MenuItem value="CHECKING">Checking</MenuItem>
                    </CustomInputTextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: { xs: "8px 0", sm: "16px 0" },
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    SAVE
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default BankDetails;
