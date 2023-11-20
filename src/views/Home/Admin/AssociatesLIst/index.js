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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomAlert from "../../../../components/CustomAlert";

import { makeStyles } from "@mui/styles";
import Api from "../../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../../components/PrivateRoute";

import { StyledTableCell } from "..";

export const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableData: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
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

const AssociatesListPage = () => {
  const customStyles = customTextStyles();
  const [isLoadingSpin, setIsLoadingSpin] = useState(false);
  const [isDeleteLoadingSpin, setIsDeleteLoadingSpin] = useState(false);
  const [associateDetails, setAssociateDetails] = useState([]);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const handleFetchAssociateDetails = () => {
    setIsLoadingSpin(true);
    privateApiGET(Api.associateDetails)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setAssociateDetails(data?.data);
        }
        setIsLoadingSpin(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoadingSpin(false);
      });
  };

  const handleDeleteAssociate = (id) => {
    let payload = { associateId: id };
    setIsDeleteLoadingSpin(true);
    privateApiPOST(Api.associateDetails, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setAssociateDetails(data?.data);
          setShowAlert({
            isAlert: true,
            alertText: data?.message,
            severity: "success",
          });
        }
        setIsDeleteLoadingSpin(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data?.message,
          severity: "error",
          alertTitle: "Error",
        });
        setIsDeleteLoadingSpin(false);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchAssociateDetails();
    }
  }, []);

  return (
    <Box>
      {showAlert.isAlert ? (
        <CustomAlert
          open={showAlert.isAlert}
          severity={showAlert.severity}
          alertTitle={showAlert.alertTitle}
          alertText={showAlert.alertText}
          onClose={() =>
            setShowAlert({
              isAlert: false,
              alertTitle: "",
              alertText: "",
              severity: "",
            })
          }
        />
      ) : null}
      <Typography
        variant="h3"
        sx={{
          padding: "20px",
          backgroundColor: "#DDDDDD",
        }}
      >
        Associate's List
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: { sm: "20px", xs: "0" },
          paddingTop: { xs: "30px" },
          paddingBottom: { xs: "20px" },
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
          {isLoadingSpin ? (
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
                top: "30%",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
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
                      Contact No
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableHeader}>
                      Associate Code
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableHeader}>
                      Action
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {associateDetails.length > 0 &&
                    associateDetails.map((row, id) => (
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
                        <StyledTableCell className={customStyles.tableData}>
                          {row.code}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            disabled={isDeleteLoadingSpin}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => {
                              handleDeleteAssociate(row.id);
                            }}
                            className={customStyles.buttons}
                          >
                            Delete{" "}
                            {isDeleteLoadingSpin && (
                              <CircularProgress sx={{ ml: 1 }} size={14} />
                            )}
                          </Button>
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
            </TableContainer>
          )}
          {associateDetails.length === 0 && !isLoadingSpin && (
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

export default AssociatesListPage;
