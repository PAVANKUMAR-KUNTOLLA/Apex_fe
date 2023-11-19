import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Grid, Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import TabsDesktop from "./tabsDesktop";
import BasicAccordion from "./accordinMobile";

import Api from "../../components/Api";
import { privateApiGET, privateApiPOST } from "../../components/PrivateRoute";
import DrawerAppBar from "../../Layout/MainLayout/appBarMaterialUI";

const ReferPage = () => {
  return (
    <Page title={"Refer"}>
      <Container maxWidth="lg">
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <TabsDesktop />
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <BasicAccordion />
        </Box>
      </Container>
    </Page>
  );
};

export default ReferPage;
