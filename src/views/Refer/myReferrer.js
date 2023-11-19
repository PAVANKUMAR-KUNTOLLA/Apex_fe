import React, { useState, useEffect } from "react";

import { Container, Typography, Box, Grid, TextField } from "@mui/material";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import CustomInputTextField from "../../components/CustomInputField";

const MyReferrer = () => {
  const [isReferralDetailsLoading, setIsReferralDetailsLoading] =
    useState(false);
  const [referralDetails, setReferralDetails] = useState({
    referralEmail: "",
    referralID: "",
  });

  const handleFetchProfileDetails = () => {
    setIsReferralDetailsLoading(true);
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setReferralDetails({
            ...referralDetails,
            referralEmail: data?.data["referred_by"],
            referralID: data?.data["referral_id"],
          });
          setIsReferralDetailsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsReferralDetailsLoading(false);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchProfileDetails();
    }
  }, []);

  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "#fff",
        padding: { sm: "30px", xs: "0" },
        paddingTop: { xs: "30px" },
        paddingBottom: { xs: "20px" },

        bgcolor: "#ffffff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "6px",
        boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
        overflow: "hidden",
        marginTop: "20px",
        color: "#333333",
        backgroundImage: "none",
      }}
    >
      <Container>
        <Typography variant="h4">Referal Details:</Typography>

        <Grid container>
          <Grid item sm={5} xs={12} sx={{ marginRight: "20px" }}>
            <CustomInputTextField
              fullWidth
              attribute="Referral ID"
              margin="normal"
              name="referralID" // Updated name
              disabled
              value={referralDetails.referralID} // Updated value
              variant="outlined"
            />
          </Grid>
          <Grid item sm={5} xs={12} sx={{ marginRight: "20px" }}>
            <CustomInputTextField
              fullWidth
              attribute="Referral Email"
              margin="normal"
              name="referralEmail" // Updated name
              value={referralDetails.referralEmail} // Updated value
              variant="outlined"
              disabled
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MyReferrer;
