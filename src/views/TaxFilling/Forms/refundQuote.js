import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import React from "react";

const RefundQuote = () => {
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
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="h5" color="error" align="center">
                Refund Quote will be available after a telephone call with Tax
                Consultant.
              </Typography>
              <Box mt={2}>
                <Typography variant="h5" color="error" align="center">
                  You will be receiving an email as soon as the Refund quote is
                  ready.
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="h5" color="error" align="center">
                  Please visit the Refund Quote section later.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default RefundQuote;
