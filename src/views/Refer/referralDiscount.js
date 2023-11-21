import { Typography, Box, Container, List, ListItem } from "@mui/material";
import React from "react";

const ReferralDiscount = () => {
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
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        overflow: "hidden",
        marginTop: "20px",
        color: "#333333",
        backgroundImage: "none",
        height: "800px",
        overflow: "auto",
        maxHeight: "800px",
      }}
    >
      {/* <Container> */}
      <Box>
        <Typography
          sx={{
            color: "rgba(71,71,71,1)",
            fontSize: "21px",
            fontWeight: 500,
            lineHeight: "33px",
            textAlign: "left",
            marginBottom: "32px",
          }}
        >
          Referral Discount Details
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          1 - 4 New Clients Referred : $10 for each client who completes their
          tax filing with us
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          5 - 9 New Clients Referred : $20 for each client who completes their
          tax filing with us
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>
          10 or more New Clients Referred : $30 for each client who completes
          their tax filing with us
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> All Referral Discounts will be applied only if
              newly referred clients complete their tax filing with us
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> Referral discount will be used towards your tax
              filing fee
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> If you have more referral discount than your
              tax filing fee, it will be carried forward and used towards your
              future service fee with Taxcooler Inc
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> Referral discount cannot be transferred from
              one client to another
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> You can earn as much referral discount as
              possible by referring more new clients to us every year
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> New Client means who did not file with
              TaxCooler Inc in any of the previous years
            </Typography>
          </ListItem>
          <ListItem>
            <Box variant="body1">
              <font color="green" size="2">
                Example:
                <ul>
                  <li>You referred 5 new clients in this year</li>
                  <li>
                    3 of them filed with us and 2 of them did not complete their
                    tax return with us. You get referral discount for 3 new
                    clients who completed their filing with us
                  </li>
                  <li>
                    Referral discount would be $10 per client. So you have
                    earned $30 referral discount
                  </li>
                  <li>
                    This discount will be applied on your filing fee when you
                    are filing your tax return. If you filed your tax return
                    already, the discount will be carried forward to your future
                    filing fee (or any other service fee with Taxcooler Inc)
                  </li>
                </ul>
              </font>
            </Box>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ color: "#FF0000" }}>
              <strong>*</strong> All amounts indicated here are in legal US
              Dollars
            </Typography>
          </ListItem>
        </List>
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default ReferralDiscount;
