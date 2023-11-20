import React, { useEffect, useState } from "react";

import { TableCell, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AdminTaxFillingPage from "./AdminTaxFilingpage";
import ClientTaxFillingPage from "./ClientTaxFilingPage";

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

const HomePage = () => {
  const state = useSelector((state) => state.app);

  return (
    <>
      {state.role === "ADMIN" ? (
        <AdminTaxFillingPage />
      ) : state.role === "CLIENT" ? (
        <ClientTaxFillingPage />
      ) : null}
    </>
  );
};

export default HomePage;
