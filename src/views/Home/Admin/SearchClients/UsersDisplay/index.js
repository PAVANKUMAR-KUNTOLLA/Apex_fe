import React, { useState, useEffect, Component } from "react";
import {
  Grid,
  Box,
  Link,
  Avatar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomAlert from "../../../../../components/CustomAlert";

import { makeStyles } from "@mui/styles";
import Api from "../../../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../../../components/PrivateRoute";
import financialYears from "../../../../../mock-adapter/financialYears.json";

export const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "32px",
    marginBottom: "16px",
    color: "#2069DB",
  },
  confirmButton: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "19px",
    color: "#FFFFFF",
    padding: "10px 40px 9px",
    marginBottom: "4px",
  },
  mobileViewTableCellValue: {
    color: "rgb(71, 71, 71)",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19px",
  },
  mobileView: {
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0,0,0, 0.1)",
    backgroundColor: "rgba(255,255,255, 1) !important",
    cursor: "pointer",
    border: "none !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobileViewTableCellHeader: {
    color: "rgb(245, 166, 35)",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "14px",
  },
}));

const UsersDisplayPage = ({
  data,
  action,
  setAction,
  isUserDetailsLoadingSpin,
  handleUpdateAppointmentDetails,
}) => {
  const customStyles = customTextStyles();
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          padding: "20px",
          backgroundColor: "#DDDDDD",
        }}
      >
        Clients List
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          marginBottom: "20px",
          bgcolor: "#ffffff",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderRadius: "6px",
          // boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
          overflow: "hidden",
          color: "#333333",
          backgroundImage: "none",
        }}
      >
        <Box>
          {isUserDetailsLoadingSpin ? (
            <Box
              display="flex"
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "absolute",
                zIndex: "10",
                left: 0,
                top: "10%",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <TableContainer sx={{ marginTop: "16px" }}>
              <Table
                sx={{
                  borderCollapse: "collapse",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={customStyles.tableHeader}>
                      Full Name
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Email Id
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Contact No
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Appointment Date
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Appointment Time
                    </TableCell>
                    <TableCell className={customStyles.tableHeader}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 &&
                    data.map((row, id) => (
                      <TableRow key={id}>
                        <TableCell className={customStyles.tableData}>
                          {row.first_name} {row.last_name}
                        </TableCell>

                        <TableCell className={customStyles.tableData}>
                          {row.email}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.phone_no}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.filing.appointmentDate}
                        </TableCell>
                        <TableCell className={customStyles.tableData}>
                          {row.filing.appointmentTime}
                        </TableCell>
                        <TableCell sx={{ display: "flex", flexWrap: "nowrap" }}>
                          {["view", "update", "delete", "refund"].map(
                            (each, id) => (
                              <button
                                key={id}
                                onClick={(e) =>
                                  handleUpdateAppointmentDetails(row, each)
                                }
                                style={{
                                  minHeight: "25px",
                                  padding: "2px",
                                  marginLeft: "5px",
                                  border: "1px solid black",
                                }}
                              >
                                {each}
                              </button>
                            )
                          )}
                        </TableCell>
                        <TableCell className={customStyles.mobileView}>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "16px",
                              }}
                            >
                              <Box sx={{ marginTop: "3px" }}>
                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellHeader
                                  }
                                >
                                  First Name
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.first_name} {row.last_name}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "16px",
                              }}
                            >
                              <Box sx={{ marginTop: "3px" }}>
                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellHeader
                                  }
                                >
                                  Email Id
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.email}
                                </Typography>
                              </Box>
                              <Box sx={{ marginTop: "3px" }}>
                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellHeader
                                  }
                                >
                                  Phone Number
                                </Typography>

                                <Typography
                                  className={
                                    customStyles.mobileViewTableCellValue
                                  }
                                >
                                  {row.phone_no}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {data.length === 0 && !isUserDetailsLoadingSpin && (
            <Typography
              variant="h5"
              sx={{ textAlign: "center", margin: "10px 0" }}
            >
              No Records Found
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UsersDisplayPage;
