import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import AddRefundPage from "./AddRefund";
import SummaryRefundPage from "./SummaryRefunds";

const RefundPage = ({
  open,
  data,
  isAddRefundActive,
  addRefundData,
  handleAddRefund,
  handleAddRefundDataChange,
  handleFetchAddRefund,
  isLoadingSpin,
}) => {
  const [activeRefundPage, setActiveRefundPage] = useState("add");

  const handleActiveRefundPageChange = () => {
    if (activeRefundPage === "add") {
      setActiveRefundPage("summary");
    } else {
      setActiveRefundPage("add");
    }
  };

  return (
    <Box>
      {open ? (
        <Box
          sx={{
            margin: "10px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              padding: "20px",
              backgroundColor: "#DDDDDD",
            }}
          >
            Refund Details
          </Typography>
          {activeRefundPage === "add" ? (
            <AddRefundPage
              data={addRefundData}
              isAddRefundActive={isAddRefundActive}
              handleAddRefund={handleAddRefund}
              handleChange={handleAddRefundDataChange}
              handleSubmit={handleFetchAddRefund}
              handlePageChange={handleActiveRefundPageChange}
              isLoadingSpin={isLoadingSpin}
            />
          ) : activeRefundPage === "summary" ? (
            <SummaryRefundPage
              data={data}
              isLoadingSpin={isLoadingSpin}
              handlePageChange={handleActiveRefundPageChange}
            />
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default RefundPage;
