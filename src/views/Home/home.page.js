import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { Grid, Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import AdminHomePage from "./Admin";
import ClientHomePage from "./Client";

const HomePage = () => {
  const state = useSelector((state) => state.app);

  return (
    <Page title={"Home"}>
      {state.role === "ADMIN" ? (
        <AdminHomePage />
      ) : state.role === "CLIENT" ? (
        <ClientHomePage />
      ) : null}
    </Page>
  );
};

export default HomePage;
