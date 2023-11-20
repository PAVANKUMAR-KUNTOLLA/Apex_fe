import React from "react";

import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { customTextStyles } from "../../UsersDisplay";
import { refundTypes } from "../../../../../../constants";
import financialYears from "../../../../../../mock-adapter/financialYears.json";
import { capitalizeString } from "../../../../../../utils";

const AddRefundPage = ({
  data,
  isAddRefundActive,
  handleChange,
  handleAddRefund,
  handleSubmit,
  isLoadingSpin,
  handlePageChange,
}) => {
  const customStyles = customTextStyles();
  return (
    <Box
      sx={{
        padding: "50px 20px 40px",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ marginRight: "20px" }}>
              Cient Name :
            </Typography>
            <input
              name="name"
              readOnly={true}
              value={data[0].name}
              style={{
                maxWidth: "160px",
                minHeight: "25px",
                padding: "5px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ marginRight: "20px" }}>
              Tax Year :
            </Typography>
            <select
              id="year"
              name="year"
              value={data[0].year}
              onChange={(event) => handleChange(0, "year", event.target.value)}
              style={{ minHeight: "25px", padding: "5px" }}
            >
              {financialYears.map((each, id) => (
                <option key={id} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ marginRight: "20px" }}>
              Service Type :
            </Typography>
            <select
              id="service_type"
              name="service_type"
              value={data[0].service_type}
              readOnly={true}
              style={{ minHeight: "25px", padding: "5px" }}
            >
              {/* Add an empty option */}
              <option value="REGULAR">Regular</option>
            </select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <button
            onClick={handlePageChange}
            style={{ minHeight: "25px", padding: "5px" }}
          >
            View Refund Summary
          </button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "30px 0 20px",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          color="primary"
          onClick={handleAddRefund}
        >
          Add Refund
        </Button>
      </Box>
      <Typography variant="h5" sx={{ color: "red" }}>
        *Please enter amounts in .00 format
      </Typography>
      <TableContainer sx={{ marginTop: "16px" }}>
        <Table
          sx={{
            borderCollapse: "collapse",
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C7DFF0" }}>
              <TableCell className={customStyles.tableHeader}>
                Refund Type
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Standard Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Standard Fee
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Itemized Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Itemized Fee
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Discount
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Paid Advance
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Max Itemized Refund
              </TableCell>
              <TableCell className={customStyles.tableHeader}>
                Max Itemized Fee
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddRefundActive &&
              data.length > 0 &&
              data.map((row, id) => (
                <TableRow key={id}>
                  <TableCell className={customStyles.tableData}>
                    <select
                      name="refund_type"
                      onChange={(event) =>
                        handleChange(id, "refund_type", event.target.value)
                      }
                      value={row.refund_type}
                      style={{ minHeight: "25px", padding: "5px" }}
                    >
                      {refundTypes.map((each, id) => (
                        <option key={id} value={each}>
                          {capitalizeString(each)}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="standard_refund"
                      onChange={(event) =>
                        handleChange(id, "standard_refund", event.target.value)
                      }
                      value={row.standard_refund}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="standard_fee"
                      onChange={(event) =>
                        handleChange(id, "standard_fee", event.target.value)
                      }
                      value={row.standard_fee}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="itemized_refund"
                      onChange={(event) =>
                        handleChange(id, "itemized_refund", event.target.value)
                      }
                      value={row.itemized_refund}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="itemized_fee"
                      onChange={(event) =>
                        handleChange(id, "itemized_fee", event.target.value)
                      }
                      value={row.itemized_fee}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="discount"
                      onChange={(event) =>
                        handleChange(id, "discount", event.target.value)
                      }
                      value={row.discount}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="paid_advance"
                      onChange={(event) =>
                        handleChange(id, "paid_advance", event.target.value)
                      }
                      value={row.paid_advance}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="max_itemized_refund"
                      onChange={(event) =>
                        handleChange(
                          id,
                          "max_itemized_refund",
                          event.target.value
                        )
                      }
                      value={row.max_itemized_refund}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell className={customStyles.tableData}>
                    <input
                      name="max_itemized_fee"
                      onChange={(event) =>
                        handleChange(id, "max_itemized_fee", event.target.value)
                      }
                      value={row.max_itemized_fee}
                      style={{
                        maxWidth: "110px",
                        minHeight: "25px",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <button
          onClick={() => isAddRefundActive && handleSubmit()}
          style={{ minHeight: "25px", padding: "5px" }}
        >
          Submit Refund Details
        </button>
      </Box>
    </Box>
  );
};

export default AddRefundPage;
