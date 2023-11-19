import React from "react";
import { Box, TextField, Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";

const NO_WRAP_ATTRIBUTES = [
  "Occupation / Job Title",
  "Email Address",
  "Password",
  "Email ID (User ID)",
  "Confirm Password",
  "Referral ID (Optional)",
];

const CustomInputTextField = ({
  attribute,
  is_required,
  attributeTextAlign,
  attributeMarginTop,
  ...others
}) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        maxHeight: "60px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={4}
          sx={{ marginTop: attributeMarginTop ? attributeMarginTop : "24px" }}
        >
          {/* <Typography
            sx={{
              margin: "20px 10px",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 400,
            }}
          >
            {is_required ? (
              <>
                {attribute}
                <span
                  style={{
                    color: "red", // Set color to red
                    fontSize: "16px",
                    marginLeft: "3px",
                  }}
                >
                  {" "}
                  *
                </span>
              </>
            ) : (
              attribute
            )}
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: { xs: 0, sm: attributeTextAlign ? "5px" : 0 },
              justifyContent: {
                xs: "flex-start",
                sm: attributeTextAlign ? "flex-end" : "flex-start",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: NO_WRAP_ATTRIBUTES.includes(attribute)
                  ? "nowrap"
                  : "pre-wrap",
              }}
            >
              {attribute}
            </Typography>
            {is_required && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginLeft: "3px",
                }}
              >
                *
              </Typography>
            )}
            &nbsp;:
          </Box>
        </Grid>
        <Grid item xs={attribute === "Income Amount" ? 4 : 8}>
          <TextField
            {...others}
            sx={{
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
              width: "90%",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

CustomInputTextField.prototype = {
  is_required: PropTypes.bool,
  attribute: PropTypes.string, //['success','warning', 'error']
  attributeTextAlign: PropTypes.string, //['success','warning', 'error']
  attributeMarginTop: PropTypes.string,
};

export default CustomInputTextField;
