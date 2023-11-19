import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Tooltip,
  ButtonBase,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import TextField from "@mui/material/TextField";
import Api from "../../../components/Api";
import { privateApiPOST } from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";

const IncomeDetails = ({
  id,
  data,
  handleFetchData,
  handleDownloadTemplate,
}) => {
  const [isIncomeDetailsLoading, setIsIncomeDetailsLoading] = useState(false);

  const initialValues = {
    interestIncome: data["interestIncome"],
    dividendIncome: data["dividendIncome"],
    soldStocks: data["soldStocks"],
    soldCrypto: data["soldCrypto"],
    foreignIncome: data["foreignIncome"],
    retirementAccounts: data["retirementAccounts"],
    stateTaxRefund: data["stateTaxRefund"],
    foreignBankAccount: data["foreignBankAccount"],
    foreignAssets: data["foreignAssets"],
    rentalIncome: data["rentalIncome"],
    income1099: data["income1099"],
    incomeDescription: data["incomeDescription"],
    incomeAmount: data["incomeAmount"],
    addAdditionalInformation: false,
  };

  return (
    <Box
      sx={{
        padding: "20px 0 5px",
        border: { xs: "none", sm: "1px solid #3A97BB" },
        minHeight: { xs: "auto", sm: "800px" },
      }}
    >
      {" "}
      <Container>
        {isIncomeDetailsLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              interestIncome: Yup.boolean(),
              dividendIncome: Yup.boolean(),
              soldStocks: Yup.boolean(),
              soldCrypto: Yup.boolean(),
              foreignIncome: Yup.boolean(),
              retirementAccounts: Yup.boolean(),
              stateTaxRefund: Yup.boolean(),
              foreignBankAccount: Yup.boolean(),
              foreignAssets: Yup.boolean(),
              rentalIncome: Yup.boolean(),
              income1099: Yup.boolean(),
              incomeDescription: Yup.string().when("addAdditionalInformation", {
                is: true,
                then: Yup.string().required("Income Description is Required"),
                otherwise: Yup.string(),
              }),
              incomeAmount: Yup.number().when("addAdditionalInformation", {
                is: true,
                then: Yup.number().required("Income Amount is Required"),
                otherwise: Yup.number(),
              }),
              addAdditionalInformation: Yup.boolean(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setIsIncomeDetailsLoading(true);
              setSubmitting(true);
              let payload = { ...values, id: id };
              privateApiPOST(Api.incomeDetails, payload)
                .then((response) => {
                  const { status, data } = response;
                  if (status === 200) {
                    console.log("data", data);
                    setIsIncomeDetailsLoading(false);
                    handleFetchData();
                    setSubmitting(false);
                  }
                })
                .catch((error) => {
                  console.log("Error", error);
                  setIsIncomeDetailsLoading(false);
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
            }) => (
              <Form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Interest Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any Interest Income?
                      </FormLabel>
                      <RadioGroup
                        name="interestIncome"
                        value={values.interestIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-INT forms and Interest received in Foreign Banks"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Dividend Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any Dividend Income?
                      </FormLabel>
                      <RadioGroup
                        name="dividendIncome"
                        value={values.dividendIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-DIV forms and dividends received in Foreign Banks"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Sold Stocks */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you sell any stocks in 2022?
                      </FormLabel>
                      <RadioGroup
                        name="soldStocks"
                        value={values.soldStocks}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099-B, Gain/Loss statement in excel format. If it is ESPP/RSU stocks, upload adjusted cost basis details as well."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Sold Crypto */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you sell any Crypto Currency in 2022?
                      </FormLabel>
                      <RadioGroup
                        name="soldCrypto"
                        value={values.soldCrypto}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Download and fill Crypto CSV."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.soldCrypto ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate("Crypto_Information_1.xls")
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill Crypto Excel
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>
                  {/* Foreign Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have any foreign country income in 2022?
                      </FormLabel>
                      <RadioGroup
                        name="foreignIncome"
                        value={values.foreignIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>

                      <Tooltip
                        title="Upload Total income received in Foreign Country and Total taxes paid in Foreign Country"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Contributions/Distributions */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have contributions/distributions to/from
                        retirement accounts in year 2022?
                      </FormLabel>
                      <RadioGroup
                        name="retirementAccounts"
                        value={values.retirementAccounts}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="401k/IRA etc., which is not mentioned in your W2. Upload Bank Statement 1099 R in Upload Tax Docs section"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* State Tax Refund */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Did you get State tax refund(s) in 2022?
                      </FormLabel>
                      <RadioGroup
                        name="stateTaxRefund"
                        value={values.stateTaxRefund}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="If yes, upload 1099 G you might have received from State in Upload Tax Docs section"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  {/* Foreign Bank Account */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Account Balance in Foreign banks exceeding
                        more than $10,000?
                      </FormLabel>
                      <RadioGroup
                        name="foreignBankAccount"
                        value={values.foreignBankAccount}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="As per recent IRS laws, you need to report if the combined investments(stocks/bonds/real estate) of all your foreign accounts exceeds $10,000 on at least 1 day.
                        You do not need to pay any tax on this amount. A separate form need to be sent to IRS"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.foreignBankAccount ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate("FBAR_Information_2022.xls")
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill FBAR Excel
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {/* Foreign Assets */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Foreign Assets value more than $50,000 at
                        any time during the tax year?
                      </FormLabel>
                      <RadioGroup
                        name="foreignAssets"
                        value={values.foreignAssets}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="As per recent IRS laws, you need to report if the combined investments(stocks/bonds/Accounts/Partnerships) of all your foreign assets exceeds $50,000 on at least 1 day in year 2022. You do not need to pay any tax on this amount. You need to report these details to avoid penalties."
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                      {values.foreignAssets ? (
                        <ButtonBase
                          onClick={() =>
                            handleDownloadTemplate(
                              "FBAR_Information_2022_1.xls"
                            )
                          }
                          sx={{
                            marginTop: "2px",
                            textDecoration: "underline",
                          }}
                          disableTouchRipple
                        >
                          Download and fill FBAR Excel(Financial Assets Tab)
                        </ButtonBase>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {/* Rental Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have Rental Income in Foreign Country/USA?
                      </FormLabel>
                      <RadioGroup
                        name="rentalIncome"
                        value={values.rentalIncome}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {/* 1099-Misc/1099-NEC Income */}
                  <Grid item sm={12} xs={12}>
                    <FormControl
                      component="fieldset"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <FormLabel
                        sx={{
                          width: "550px", // Set the width here
                        }}
                      >
                        Do you have 1099-Misc/1099-NEC Income in year 2022?
                      </FormLabel>
                      <RadioGroup
                        name="income1099"
                        value={values.income1099}
                        onChange={handleChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <Tooltip
                        title="Upload 1099 Misc / 1099 NEC"
                        placement="left-end"
                      >
                        <Button>Details</Button>
                      </Tooltip>
                    </FormControl>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    sx={{
                      marginTop: "30px",
                      marginBottom: "30px",
                      marginLeft: "0px",
                    }}
                  >
                    <Grid item xs={12} className="leftSide">
                      <Typography variant="h5">
                        Add other Income Information
                      </Typography>

                      <CustomInputTextField
                        error={Boolean(
                          touched.incomeDescription && errors.incomeDescription
                        )}
                        fullWidth
                        helperText={
                          touched.incomeDescription && errors.incomeDescription
                        }
                        attribute="Income Description"
                        margin="normal"
                        name="incomeDescription"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.incomeDescription}
                        variant="outlined"
                      />

                      <CustomInputTextField
                        error={Boolean(
                          touched.incomeAmount && errors.incomeAmount
                        )}
                        fullWidth
                        helperText={touched.incomeAmount && errors.incomeAmount}
                        attribute="Income Amount"
                        margin="normal"
                        name="incomeAmount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.incomeAmount}
                        variant="outlined"
                        type="number"
                      />

                      {/* <Grid item xs={12} sm={6}>
                        <Button
                          variant={
                            values.addAdditionalInformation
                              ? "contained"
                              : "outlined"
                          }
                          color="primary"
                          name="addAdditionalInformation"
                          onClick={() =>
                            handleChange(!values.addAdditionalInformation)
                          }
                          value={values.addAdditionalInformation}
                        >
                          Add Additional Information
                        </Button>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: { xs: "20px" },
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </Box>
  );
};

export default IncomeDetails;
