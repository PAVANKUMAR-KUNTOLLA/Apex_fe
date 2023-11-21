import React from "react";

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import { customTextStyles } from "../../UsersDisplay";
import { capitalizeString } from "../../../../../../utils";

const SummaryRefundPage = ({ data, isLoadingSpin, handlePageChange }) => {
  const customStyles = customTextStyles();
  return (
    <Box
      sx={{
        margin: "10px",
        border: "1px solid #DDDDDD",
        padding: "20px 20px 40px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={handlePageChange}
          style={{ minHeight: "25px", padding: "5px" }}
        >
          Back to Add Refund
        </button>
      </Box>

      <TableContainer sx={{ marginTop: "16px" }}>
        <Table
          sx={{
            borderCollapse: "collapse",
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CCEEEE" }}>
              <TableCell className={customStyles.tableHeader}>
                Refund Id
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Refund Type
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Standard Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Itemized Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Discount
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Paid Advance
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Remarks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row, id) => (
                <TableRow key={id}>
                  <TableCell className={customStyles.tableData}>
                    {row.id}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {capitalizeString(row.refund_type)}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.standard_refund}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.itemized_refund}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.discount}
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    {row.paid_advance}
                  </TableCell>
                  <TableCell className={customStyles.tableData}></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && !isLoadingSpin && (
        <Typography variant="h5" sx={{ textAlign: "center", margin: "10px 0" }}>
          No Records Found
        </Typography>
      )}
    </Box>
  );
};

export default SummaryRefundPage;
