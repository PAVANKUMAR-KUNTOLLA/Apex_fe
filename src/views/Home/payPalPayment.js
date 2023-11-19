import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";

const PayPalPayment = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Grid spacing={2} container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={7}>
          <Box
            id="ppdiv"
            name="ppdiv"
            sx={{
              fontSize: 12,
              fontFamily: "Verdana",
              display: "block",
              p: "20px", // Padding
              border: "1px solid grey", // Border style
            }}
          >
            <Typography
              variant="body1"
              color="red"
              sx={{ marginBottom: "20px" }}
            >
              P.S: If you choose this Payment option (PayPal), your tax filing
              fee includes a 3% service charge.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
              <span id="scsppt">
                Your Service Fee amount (including 3% service charge)
              </span>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
              If your payment is successful, you'll receive an automatic email
              confirmation from "PayPal."
            </Typography>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              // action="https://www.paypal.com/cgi-bin/webscr" method="post"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input type="hidden" name="business" value="4KKFRTPBL3E8E" />
              <input type="hidden" name="lc" value="US" />
              <input
                type="hidden"
                name="item_name"
                value="Tax Consultation Fee"
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="button_subtype" value="services" />
              <input type="hidden" name="no_note" value="0" />
              <input
                type="hidden"
                name="cn"
                value="Add special instructions to the seller:"
              />
              <input type="hidden" name="no_shipping" value="1" />
              <input type="hidden" name="rm" value="1" />
              <input
                type="hidden"
                name="return"
                value="https://www.taxcooler.com/payment_sucess"
              />
              <input
                type="hidden"
                name="bn"
                value="PP-BuyNowBF:btn_paynowCC_LG.gif:NonHosted"
              />
              <TextField
                label="Enter amount Here"
                type="text"
                id="pp_amount"
                name="amount"
                variant="outlined"
                fullWidth
                sx={{
                  mt: "20px",
                  width: "50%",
                  display: "block",
                  ml: { xs: "20px", sm: "0px" },
                }} // Adjust the margin-top as needed
              />
              <Button type="submit">
                <img
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                  border="0"
                  name="submit"
                  alt="PayPal - The safer, easier way to pay online!"
                />
              </Button>
              <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
            <Typography color="red">
              We will send your tax filing copies with instructions with in 2
              business days.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PayPalPayment;
