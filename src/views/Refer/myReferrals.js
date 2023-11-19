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
        boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
        overflow: "hidden",
        marginTop: "20px",
        color: "#333333",
        backgroundImage: "none",
      }}
    >
      <Container>
        <Box>
          <Typography variant="h4" sx={{ marginLeft: "10px" }}>
            Registerd Till Now:
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    First Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Last Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Email Id
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Phone Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referalDetails["joined"].length > 0 &&
                  referalDetails["joined"].map((row, id) => (
                    <TableRow key={id}>
                      <TableCell className={customStyles.tableData}>
                        {row.first_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.last_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.email}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.phone_no}
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
                                {row.first_name}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                Last Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
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
        </Box>
        <Box sx={{ marginTop: { xs: "16px", sm: "24px" } }}>
          <Typography variant="h4" sx={{ marginLeft: "10px" }}>
            Referred Till Now:
          </Typography>
          <TableContainer sx={{ marginTop: "32px" }}>
            <Table
              sx={{
                borderCollapse: "collapse",
              }}
              aria-label="Place Order Series Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={customStyles.tableHeader}>
                    First Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Last Name
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Email Id
                  </TableCell>
                  <TableCell className={customStyles.tableHeader}>
                    Phone Number
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referalDetails["not_joined"].length > 0 &&
                  referalDetails["not_joined"].map((row, id) => (
                    <TableRow key={id}>
                      <TableCell className={customStyles.tableData}>
                        {row.first_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.last_name}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.email}
                      </TableCell>
                      <TableCell className={customStyles.tableData}>
                        {row.contact_no}
                      </TableCell>
                      <TableCell className={customStyles.mobileView}>
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
                                {row.first_name}
                              </Typography>
                            </Box>
                            <Box sx={{ marginTop: "3px", marginRight: "10px" }}>
                              <Typography
                                className={
                                  customStyles.mobileViewTableCellHeader
                                }
                              >
                                Last Name
                              </Typography>

                              <Typography
                                className={
                                  customStyles.mobileViewTableCellValue
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
                                {row.contact_no}
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
        </Box>
      </Container>
    </Box>
  );
};

export default MyReferrals;
