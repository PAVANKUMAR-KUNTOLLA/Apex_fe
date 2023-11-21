import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { statesNames, countryCode } from "../../../constants";
import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import CustomInputTextField from "../../../components/CustomInputField";
import { CustomLabel } from "./filerDeatils";
import { StyledTableCell } from "..";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "23px",
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "8px",
      display: "none",
    },
  },
  mobileViewStyledTableCellValue: {
    color: "rgb(71, 71, 71)",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19px",
  },
  mobileView: {
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0,0,0, 0.1)",
    backgroundColor: "rgba(255,255,255, 1) !important",
    cursor: "pointer",
    border: "none !important",
    marginBottom: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobileViewStyledTableCellHeader: {
    color: "rgb(245, 166, 35)",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "14px",
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ConfirmDetails = ({
  open,
  id,
  personalDetails,
  contactDetails,
  spouseDetails,
  incomeDetails,
  providedLivingSupport,
  bankDetails,
  handlePickAppointment,
  dependantDetails,
}) => {
  const customStyles = useStyles();
  const stateOptions = statesNames;
  const countryCodes = countryCode;

  const transform = (input) => {
    if (input === undefined || input === null) {
      return "";
    }

    if (input.includes("-")) {
      return input;
    }

    const rawSsn = input.replace(/-/g, ""); // Remove hyphens
    const formattedSsn = rawSsn
      .replace(/\D/g, "") // Remove non-digits
      .replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3"); // Format as 123-45-6789
    return formattedSsn;
  };

  const [formData, setFormData] = useState({
    // Personal Details

    firstName: personalDetails["firstName"],
    middleName: personalDetails["middleName"],
    lastName: personalDetails["lastName"],
    ssn: personalDetails["ssn"],
    dateOfBirth: personalDetails["dateOfBirth"],
    gender: personalDetails["gender"],
    occupation: personalDetails["occupation"],
    residentialStatus: personalDetails["residentialStatus"],
    email: personalDetails["email"],

    // Contact Details
    street: contactDetails["street"],
    apartment: contactDetails["apartment"],
    city: contactDetails["city"],
    state: contactDetails["state"],
    zipCode: contactDetails["zipCode"],
    country: contactDetails["country"],
    primaryCountryCode: contactDetails["primaryCountryCode"],
    primaryPhoneNumber: contactDetails["primaryPhoneNumber"],
    secondaryCountryCode: contactDetails["secondaryCountryCode"],
    secondaryPhoneNumber: contactDetails["secondaryPhoneNumber"],
    contactEmail: contactDetails["contactEmail"],

    taxFiledLastYear: incomeDetails["taxFiledLastYear"], // Set an initial value for taxFiledLastYear

    // additional Spouse Details (Initially hidden)
    taxPayerStatus: personalDetails["taxPayerStatus"], // Default to "No" (Single)
    spouseFirstName: spouseDetails["spouseFirstName"],
    spouseMiddleInitial: spouseDetails["spouseMiddleInitial"],
    spouseLastName: spouseDetails["spouseLastName"],
    spouseSsnOrItin: spouseDetails["spouseSsnOrItin"],
    spouseApplyForItin: spouseDetails["spouseApplyForItin"], // Default to "No"
    spouseDateOfBirth: spouseDetails["spouseDateOfBirth"],
    spouseGender: spouseDetails["spouseGender"],
    spouseOccupation: spouseDetails["spouseOccupation"],
    spouseResidentialStatus: spouseDetails["spouseResidentialStatus"],
    spouseEmail: spouseDetails["spouseEmail"],

    providedLivingSupport: providedLivingSupport,

    //Income Details
    interestIncome: incomeDetails["interestIncome"],
    dividendIncome: incomeDetails["dividendIncome"],
    soldStocks: incomeDetails["soldStocks"],
    soldCrypto: incomeDetails["soldCrypto"],
    foreignIncome: incomeDetails["foreignIncome"],
    retirementAccounts: incomeDetails["retirementAccounts"],
    stateTaxRefund: incomeDetails["stateTaxRefund"],
    foreignBankAccount: incomeDetails["foreignBankAccount"],
    foreignAssets: incomeDetails["foreignAssets"],
    rentalIncome: incomeDetails["rentalIncome"],
    income1099: incomeDetails["income1099"],
    incomeDescription: incomeDetails["incomeDescription"],
    incomeAmount: incomeDetails["incomeAmount"],
    addAdditionalInformation: false,

    //Bank Details
    bankingType: bankDetails["bankingType"],
    bankName: bankDetails["bankName"],
    accountHolderName: bankDetails["accountHolderName"],
    ownership: bankDetails["ownership"],
    routingNumber: bankDetails["routingNumber"],
    confirmRoutingNumber: bankDetails["confirmRoutingNumber"],
    accountNumber: bankDetails["accountNumber"],
    confirmAccountNumber: bankDetails["confirmAccountNumber"],
    accountType: bankDetails["accountType"],
    confirmAccountType: bankDetails["confirmAccountType"],
  });

  return (
    <Box
      sx={{
        padding: "20px 30px 5px",
        border: { xs: "none", sm: "none" },
        minHeight: { xs: "auto", sm: "800px" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={6} sm={6} xs={12}>
          <Box className={customStyles.leftSide}>
            <Typography variant="h4" sx={{ marginBottom: "36px" }}>
              Personal Details
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "96%",
              }}
            >
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ marginTop: "20px", maxWidth: "30%" }}
              >
                Taxpayer Name
                <font color="red" size="2">
                  (As Per SSN):
                </font>
              </Typography>

              <Box>
                <CustomInputTextField
                  disabled
                  attribute="First Name"
                  attributeTextAlign="right"
                  is_required={true}
                  fullWidth
                  margin="normal"
                  name="firstName"
                  value={formData.firstName}
                  variant="outlined"
                />

                <CustomInputTextField
                  disabled
                  attribute="Middle Initial"
                  attributeTextAlign="right"
                  is_required={false}
                  fullWidth
                  margin="normal"
                  name="middleName"
                  value={formData.middleName}
                  variant="outlined"
                />
                <CustomInputTextField
                  disabled
                  attribute="Last Name"
                  attributeTextAlign="right"
                  is_required={true}
                  fullWidth
                  margin="normal"
                  name="lastName"
                  value={formData.lastName}
                  variant="outlined"
                />
              </Box>
            </Box>

            <CustomInputTextField
              disabled
              attribute="SSN"
              attributeTextAlign="right"
              is_required={true}
              fullWidth
              margin="normal"
              name="ssn"
              value={transform(formData.ssn)}
              variant="outlined"
            />
            <CustomInputTextField
              disabled
              attribute="Date of Birth"
              attributeTextAlign="right"
              is_required={true}
              fullWidth
              margin="normal"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
              inputProps={{
                placeholder: "",
              }}
            />
            <CustomInputTextField
              disabled
              attribute="Gender"
              attributeTextAlign="right"
              is_required={true}
              select
              fullWidth
              margin="normal"
              name="gender"
              value={formData.gender}
              variant="outlined"
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomInputTextField>
            <CustomInputTextField
              disabled
              attribute="Occupation / Job Title"
              attributeTextAlign="right"
              is_required={true}
              fullWidth
              margin="normal"
              name="occupation"
              value={formData.occupation}
              variant="outlined"
            />
            <CustomInputTextField
              disabled
              attribute="Residential Status"
              attributeTextAlign="right"
              is_required={true}
              fullWidth
              margin="normal"
              name="residentialStatus"
              value={formData.residentialStatus}
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Right Side - Contact Details */}
        <Grid item lg={6} sm={6} xs={12}>
          <Box className={customStyles.rightSide}>
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>
              Contact Details
            </Typography>
            <Typography color={"red"} sx={{ marginLeft: "10px" }} variant="h5">
              (Provide U.S current communication Address)
            </Typography>
            <CustomInputTextField
              attribute="Street"
              is_required={true}
              fullWidth
              name="street"
              value={formData.street}
              variant="outlined"
              disabled
            />
            <CustomInputTextField
              attribute="Apartment"
              is_required={true}
              fullWidth
              name="apartment"
              value={formData.apartment}
              variant="outlined"
              disabled
            />
            <CustomInputTextField
              attribute="City"
              is_required={true}
              fullWidth
              name="city"
              value={formData.city}
              variant="outlined"
              disabled
            />
            <CustomInputTextField
              attribute="State"
              is_required={true}
              select
              fullWidth
              name="state"
              value={formData.state}
              variant="outlined"
              disabled
            >
              {stateOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomInputTextField>
            <CustomInputTextField
              attribute="Zip Code"
              is_required={true}
              fullWidth
              name="zipCode"
              value={formData.zipCode}
              variant="outlined"
              disabled
            />
            <CustomInputTextField
              attribute="Country"
              is_required={true}
              select
              fullWidth
              name="country"
              value={formData.country}
              variant="outlined"
              disabled
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomInputTextField>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "93%",
                margin: "10px 0",
                maxHeight: "60px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  width: { xs: "30%", sm: "120px" },
                }}
              >
                <span>Primary Phone</span>
                <span
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginLeft: "3px",
                  }}
                >
                  *
                </span>
                &nbsp;:
              </Typography>
              <TextField
                attribute="Primary Phone"
                select
                name="primaryCountryCode"
                value={formData.primaryCountryCode}
                variant="outlined"
                disabled
                sx={{
                  width: "18%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                {countryCodes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="primaryPhoneNumber"
                value={formData.primaryPhoneNumber}
                variant="outlined"
                disabled
                sx={{
                  width: { xs: "50%", sm: "165px" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "93%",
                margin: "10px 0",
                maxHeight: "60px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  width: { xs: "30%", sm: "120px" },
                }}
              >
                <span>Secondary Phone</span>
                &nbsp;:
              </Typography>
              <TextField
                name="secondaryCountryCode"
                value={formData.secondaryCountryCode}
                variant="outlined"
                disabled
                sx={{
                  width: "18%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                {countryCodes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                attribute="Secondary Phone"
                name="secondaryPhoneNumber"
                value={formData.secondaryPhoneNumber}
                variant="outlined"
                disabled
                sx={{
                  width: { xs: "50%", sm: "165px" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "0.1px solid #bdbdbd",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              />
            </Box>
            <CustomInputTextField
              attribute="Email Id"
              is_required={true}
              fullWidth
              name="contactEmail"
              value={formData.contactEmail}
              variant="outlined"
              disabled
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ margin: "16px 0" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={10}
              sm={5}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="body1">
                <CustomLabel
                  label="Have you filed your taxes with Taxcooler in the last year?"
                  required={true}
                />
              </Typography>
            </Grid>
            <Grid item xs={2} sm={1}>
              <select
                id="taxFiledLastYear"
                name="taxFiledLastYear"
                value={formData.taxFiledLastYear}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select</option>
                {/* Add an empty option */}
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ margin: "16px 0" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              sm={5}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                <CustomLabel label="Taxpayer Status" required={true} />
              </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
              <select
                id="taxPayerStatus"
                name="taxPayerStatus"
                value={formData.taxPayerStatus}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select Status</option>{" "}
                {/* Add an empty option */}
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
              </select>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {formData.taxPayerStatus === "MARRIED" && (
        <Grid container spacing={2}>
          {/* Left Side - Spouse Details */}
          <Grid item lg={6} sm={6} xs={12}>
            <Typography variant="h4" mb={2}>
              Spouse Details
            </Typography>
            <Grid container spacing={2}>
              <CustomInputTextField
                attribute="First Name"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseFirstName"
                value={formData.spouseFirstName}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="Middle Initial"
                is_required={false}
                attributeMarginTop="8px"
                fullWidth
                name="spouseMiddleInitial"
                value={formData.spouseMiddleInitial}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="Last Name"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseLastName"
                value={formData.spouseLastName}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="SSN/ITIN"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseSsnOrItin"
                value={transform(formData.spouseSsnOrItin)}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="Do you want to apply for ITIN?"
                is_required={true}
                attributeMarginTop="8px"
                select
                fullWidth
                name="spouseApplyForItin"
                value={formData.spouseApplyForItin}
                variant="outlined"
                disabled
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </CustomInputTextField>
            </Grid>
          </Grid>

          {/* Right Side - Spouse Contact */}
          <Grid item lg={6} sm={6} xs={12}>
            <Typography variant="h4" mb={2}>
              Spouse Contact
            </Typography>
            <Grid container spacing={2}>
              <CustomInputTextField
                attribute="Date of Birth"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseDateOfBirth"
                type="date"
                value={formData.spouseDateOfBirth}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: {
                    color: "black",
                  },
                }}
                inputProps={{
                  placeholder: "",
                }}
                disabled
              />

              <CustomInputTextField
                attribute="Gender"
                is_required={true}
                attributeMarginTop="8px"
                select
                fullWidth
                name="spouseGender"
                value={formData.spouseGender}
                variant="outlined"
                disabled
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </CustomInputTextField>

              <CustomInputTextField
                attribute="Occupation / Job Title"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseOccupation"
                value={formData.spouseOccupation}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="Residential Status"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseResidentialStatus"
                value={formData.spouseResidentialStatus}
                variant="outlined"
                disabled
              />

              <CustomInputTextField
                attribute="Email Id"
                is_required={true}
                attributeMarginTop="8px"
                fullWidth
                name="spouseEmail"
                value={formData.spouseEmail}
                variant="outlined"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Grid
          container
          sx={{
            marginTop: "36px",
            marginBottom: "24px",
          }}
        >
          <Grid
            item
            xs={10}
            sm={9}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">
              <CustomLabel
                label=" Have you (or your spouse, if married) provided living
                        support to your kids and/or dependents during the tax
                        year?"
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <CustomInputTextField
              attribute=""
              is_required={true}
              // label={<CustomLabel label="" />}
              select
              margin="normal"
              name="providedLivingSupport"
              value={formData.providedLivingSupport}
              variant="outlined"
              disabled
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </CustomInputTextField>
          </Grid>
        </Grid>
        <Grid>
          <Typography
            variant="body1"
            style={{ color: "blue", wordSpacing: "2px" }}
          >
            NOTE: Make sure the kids or dependants reported in your (Taxpayer)
            2023 Tax Return are not claimed as dependants in any other 2023
            Individual Tax Returns.
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TableContainer
          sx={{
            margin: "30px 0",
            paddingBottom: { xs: "10px", sm: "0px" },
          }}
        >
          <Typography
            sx={{
              color: "rgba(71,71,71,1)",
              fontSize: "21px",
              fontWeight: 500,
              lineHeight: "33px",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Dependant Details
          </Typography>
          <Table
            sx={{
              borderCollapse: "collapse",
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell className={customStyles.tableHeader}>
                  Name
                </StyledTableCell>

                <StyledTableCell className={customStyles.tableHeader}>
                  Relationship
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  SSN/ITIN
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  Apply ?
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  DOB
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  Visa Type
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  C.S
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  Months
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dependantDetails.length > 0 &&
                dependantDetails.map((row, index) => (
                  <TableRow key={index}>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalFirstName} {row.additionalLastName}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalRelationship}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {transform(row.additionalSsnOrItin)}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalApplyForItin ? "YES" : "NO"}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalDateOfBirth}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalVisaType}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      USA
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.additionalStayCount}
                    </StyledTableCell>

                    <StyledTableCell className={customStyles.mobileView}>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginTop: "16px",
                          }}
                        >
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              First Name
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.additionalFirstName}
                            </Typography>
                          </Box>
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Last Name
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.additionalLastName}
                            </Typography>
                          </Box>
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              RelationShip
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.additionalRelationship}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginTop: "16px",
                          }}
                        >
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Visa Type
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.additionalVisaType}
                            </Typography>
                          </Box>

                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              SSN/ITIN
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {transform(row.additionalSsnOrItin)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {dependantDetails.length === 0 && (
            <Typography
              variant="h5"
              sx={{ textAlign: "center", margin: "10px 0" }}
            >
              No Dependants Found
            </Typography>
          )}
        </TableContainer>
      </Grid>
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
              value={formData.interestIncome}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.dividendIncome}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.soldStocks}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.soldCrypto}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.foreignIncome}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              Do you have contributions/distributions to/from retirement
              accounts in year 2022?
            </FormLabel>
            <RadioGroup
              name="retirementAccounts"
              value={formData.retirementAccounts}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.stateTaxRefund}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              Do you have Account Balance in Foreign banks exceeding more than
              $10,000?
            </FormLabel>
            <RadioGroup
              name="foreignBankAccount"
              value={formData.foreignBankAccount}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              Do you have Foreign Assets value more than $50,000 at any time
              during the tax year?
            </FormLabel>
            <RadioGroup
              name="foreignAssets"
              value={formData.foreignAssets}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
              value={formData.rentalIncome}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
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
              value={formData.income1099}
              disabled
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
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
            <Typography variant="h5">Add other Income Information</Typography>

            <CustomInputTextField
              disabled
              fullWidth
              attribute="Income Description"
              margin="normal"
              name="incomeDescription"
              value={formData.incomeDescription}
              variant="outlined"
            />

            <CustomInputTextField
              disabled
              fullWidth
              attribute="Income Amount"
              margin="normal"
              name="incomeAmount"
              value={formData.incomeAmount}
              variant="outlined"
              type="number"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: "0px" }}>
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            Important Note
          </Typography>
          <Typography
            sx={{
              marginTop: "30px",
              wordSpacing: "2px",
            }}
          >
            The IRS and certain State Revenue Departments facilitate DIRECT
            DEPOSIT / WITHDRAWAL of Tax Refund or Tax Dues on the Tax Returns.
            If you are interested in availing this option, we request you to
            kindly input the following details.
          </Typography>

          <Grid container sx={{ marginBottom: "30px", marginTop: "30px" }}>
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
                value={formData.bankingType}
                style={{ width: "100%" }}
                disabled
              >
                <option value="">Select Option</option>
                <option value="DIRECT DEPOSIT INTO MY BANK ACCOUNT">
                  Direct deposit into my bank account
                </option>
                <option value="PAPER CHECK">Paper Check</option>
              </select>
            </Grid>
          </Grid>
        </Grid>

        {formData.bankingType === "DIRECT DEPOSIT INTO MY BANK ACCOUNT" && (
          <Grid item xs={12}>
            {/* Additional Fields for Direct Deposit */}
            <Typography
              variant="h5"
              sx={{ marginTop: "30px", marginLeft: "15px" }}
            >
              Direct Deposit Information
            </Typography>
            <Typography sx={{ marginTop: "30px", marginLeft: "15px" }}>
              Note : Please understand that there is no risk by entering Bank
              Account and Routing Numbers
            </Typography>
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
                  fullWidth
                  value={formData.bankName}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Account Number"
                  is_required={false}
                  margin="normal"
                  name="accountNumber"
                  fullWidth
                  value={formData.accountNumber}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Routing Number"
                  is_required={false}
                  margin="normal"
                  name="routingNumber"
                  fullWidth
                  value={formData.routingNumber}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Account Type"
                  is_required={false}
                  margin="normal"
                  name="accountType"
                  select
                  fullWidth
                  value={formData.accountType}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
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
                  fullWidth
                  value={formData.ownership}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
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
                  fullWidth
                  value={formData.accountHolderName}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Confirm Account Number"
                  is_required={false}
                  margin="normal"
                  name="confirmAccountNumber"
                  fullWidth
                  value={formData.confirmAccountNumber}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Confirm Routing Number"
                  is_required={false}
                  margin="normal"
                  name="confirmRoutingNumber"
                  fullWidth
                  value={formData.confirmRoutingNumber}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                />
                <CustomInputTextField
                  attribute="Confirm Account Type"
                  is_required={false}
                  margin="normal"
                  name="confirmAccountType"
                  select
                  fullWidth
                  value={formData.confirmAccountType}
                  variant="outlined"
                  disabled={formData.bankingType === "PAPER CHECK"}
                >
                  <MenuItem value="SAVINGS">Savings</MenuItem>
                  <MenuItem value="CHECKING">Checking</MenuItem>
                </CustomInputTextField>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: { xs: 0, sm: "16px 0" },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePickAppointment("Pick Appointment")}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Confirm Personal Details To Pick An Appointment
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePickAppointment("panel6")}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Confirm Personal Details To Pick An Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmDetails;
