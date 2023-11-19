import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import AdminTaxFillingPage from "./AdminTaxFilingpage";
import ClientTaxFillingPage from "./ClientTaxFilingPage";

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
