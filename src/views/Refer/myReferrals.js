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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { StyledTableCell } from ".";
import PerfectScrollbar from "react-perfect-scrollbar";

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
  mobileViewStyledTableCellValue: {
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
  mobileViewStyledTableCellHeader: {
    color: "rgb(245, 166, 35)",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "14px",
  },
}));

const MyReferrals = () => {
  const customStyles = customTextStyles();
  const [isReferalDetailsLoading, setIsReferalDetailsLoading] = useState(false);
  const [referalDetails, setReferalDetails] = useState({
    joined: [],
    not_joined: [],
  });

  const handleFetchReferalDetails = () => {
    privateApiGET(Api.referalDetails)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setReferalDetails({
            joined: data?.data["joined"],
            not_joined: data?.data["not_joined"],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchReferalDetails();
    }
  }, []);
  console.log(referalDetails);
  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "#fff",
        padding: { sm: "30px", xs: "0" },
        paddingTop: { xs: "30px" },
        paddingBottom: { xs: "20px" },

        bgcolor: "#ffffff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "6px",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        overflow: "hidden",
        marginTop: "20px",
        color: "#333333",
        backgroundImage: "none",
        height: "800px",
        overflow: "auto",
        maxHeight: "800px",
      }}
    >
      <PerfectScrollbar>
        {/* <Container> */}
        <Box>
          <Typography
            sx={{
              color: "rgba(71,71,71,1)",
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "33px",
              textAlign: "left",
              marginBottom: "16px",
            }}
          >
            Registered Till Now
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className={customStyles.tableHeader}>
                    First Name
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Last Name
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Email Id
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Phone Number
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referalDetails["joined"].length > 0 &&
                  referalDetails["joined"].map((row, id) => (
                    <TableRow key={id}>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.last_name}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.phone_no}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.mobileView}>
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
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                First Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.first_name}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Last Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.last_name}
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
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Email Id
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.email}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Phone Number
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.phone_no}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {referalDetails["joined"].length === 0 && (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", margin: "10px 0" }}
              >
                No Records Found
              </Typography>
            )}
          </TableContainer>
        </Box>
        <Box sx={{ marginTop: { xs: "16px", sm: "24px" } }}>
          <Typography
            sx={{
              color: "rgba(71,71,71,1)",
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "33px",
              textAlign: "left",
              marginBottom: "16px",
            }}
          >
            Referred Till Now
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className={customStyles.tableHeader}>
                    First Name
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Last Name
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Email Id
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Phone Number
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referalDetails["not_joined"].length > 0 &&
                  referalDetails["not_joined"].map((row, id) => (
                    <TableRow key={id}>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.last_name}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.contact_no}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.mobileView}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "16px",
                            }}
                          >
                            <Box sx={{ marginTop: "3px", marginRight: "10px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                First Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.first_name}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px", marginRight: "10px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Last Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.last_name}
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
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Email Id
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.email}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellHeader
                                }
                              >
                                Phone Number
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewStyledTableCellValue
                                }
                              >
                                {row.contact_no}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {referalDetails["not_joined"].length === 0 && (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", margin: "10px 0" }}
              >
                No Records Found
              </Typography>
            )}
          </TableContainer>
        </Box>
        {/* </Container> */}
      </PerfectScrollbar>
    </Box>
  );
};

export default MyReferrals;
