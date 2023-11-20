import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import {
  Grid,
  Container,
  Box,
  CircularProgress,
  TableCell,
  styled,
} from "@mui/material";
import { useParams } from "react-router-dom";

import TabsDesktop from "./tabsDesktop";
import BasicAccordion from "./accordinMobile";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    backgroundColor: "#FFFFFF",
    borderWidth: "1px 0",
    borderStyle: "solid",
    borderColor: "#E2EBFF",
    "&:first-of-type": {
      borderLeftWidth: "1px",
    },
    "&:nth-last-of-type(2)": {
      borderRightWidth: "1px",
    },
  },
}));

const ReferPage = () => {
  return (
    <Page title={"Refer"}>
      {/* <Container maxWidth="lg"> */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <TabsDesktop />
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <BasicAccordion />
      </Box>
      {/* </Container> */}
    </Page>
  );
};

export default ReferPage;
