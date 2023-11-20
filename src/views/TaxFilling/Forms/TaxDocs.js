import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import { Card, CardContent, Link } from "@mui/material";

import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GetApp, CloudUpload, FilterAltOffSharp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import Api from "../../../components/Api";
import CustomAlert from "../../../components/CustomAlert";
import axios from "axios";
import { StyledTableCell } from "..";
export const customTextStyles = makeStyles((theme) => ({
  tableHeader: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "8px",
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
  buttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  alertCard: {
    border: "1px solid #000000",
    marginBottom: theme.spacing(2),
  },
  alertIcon: {
    color: "#EB3414",
    marginRight: theme.spacing(1),
  },
  root: {
    color: "red",
    fontSize: "1.0rem",
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    color: "primary",
  },
  info: {
    color: "green",
    fontSize: "1.5rem",
    border: "1px solid #000000",
    marginTop: "10px",
  },
}));

const UploadTaxDocs = ({ id }) => {
  const customStyles = customTextStyles();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    isImport: false,
    isImpoFormSubmitting: false,
    selectedFile: {},
    isMyTaxDocsLoading: false,
    myTaxDocs: [],
  });

  const handleDownloadFile = (file) => {
    setIsLoading(true);

    let payload = {
      file_name: file,
      id: id,
      type: "docs",
    };

    privateApiPOST(Api.downloadTaxDocsFile, payload, { responseType: "blob" })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setIsLoading(false);
          const url = window.URL.createObjectURL(new Blob([data]));
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.setAttribute("download", file);
          document.body.appendChild(anchor);
          anchor.click();
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("handleDownloadFile--->", err);
        setIsLoading(false);
      });
  };

  const handleDeleteFile = (file) => {
    setIsLoading(true);

    let payload = {
      file_name: file,
      id: id,
      type: "docs",
    };

    privateApiPOST(Api.deleteTaxDocsFile, payload)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setShowAlert({
            isAlert: true,
            severity: "success",
            alertText: data?.["message"],
          });
          setIsLoading(false);
          handleFetchMyTaxDocs();
        }
      })
      .catch((err) => {
        console.log("handleDeleteFile--->", err);
        setShowAlert({
          isAlert: true,
          severity: "error",
          alertText: data?.["message"],
        });
        setIsLoading(false);
      });
  };

  //CLICK - Upload input file
  const handleUploadClick = (e) => {
    let file = e.target.files[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        selectedFile: file,
      }));
    }
  };

  //SUBMIT - Import form
  const handleUploadTaxDocs = () => {
    if (!state.selectedFile.name) {
      setShowAlert({
        isAlert: true,
        severity: "warning",
        alertText: "Please choose file to import",
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isImpoFormSubmitting: true,
    }));

    const formData = new FormData();
    formData.append("upload", state.selectedFile);
    formData.append("id", id);
    formData.append("type", "docs");

    const token = sessionStorage.getItem("token");
    axios
      .post(Api.uploadTaxDocs, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setShowAlert({
            isAlert: true,
            severity: "success",
            alertText: data?.["message"],
          });
          setState((prev) => ({
            ...prev,
            selectedFile: {},
            isImpoFormSubmitting: false,
            isImport: false,
          }));
          handleFetchMyTaxDocs();
        }
      })
      .catch((error) => {
        console.log("handleUploadTaxDocs--->", error);
        const { data } = error.response;
        setShowAlert({
          isAlert: true,
          severity: "error",
          alertText: data?.["message"],
        });

        setState((prev) => ({
          ...prev,
          selectedFile: {},
          isImpoFormSubmitting: false,
          isImport: false,
        }));
      });
  };

  const handleFetchMyTaxDocs = () => {
    setState((prev) => ({ ...prev, isMyTaxDocsLoading: true }));
    let payload = { id: id, type: "docs" };
    privateApiPOST(Api.uploadTaxDocs, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setState((prev) => ({
            ...prev,
            isMyTaxDocsLoading: false,
            myTaxDocs: data?.data,
          }));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setState((prev) => ({ ...prev, isMyTaxDocsLoading: false }));
      });
  };

  useEffect(() => {
    handleFetchMyTaxDocs();
  }, []);

  return (
    <Box
      sx={{
        padding: "20px 30px 5px",
        border: { xs: "none", sm: "none" },
        minHeight: { xs: "auto", sm: "800px" },
      }}
    >
      {" "}
      {showAlert.isAlert && (
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
      )}
      <Card className={customStyles.alertCard}>
        <CardContent>
          <Typography sx={{ marginBottom: "10px", color: "red" }}>
            Alerts
          </Typography>
          <Typography variant="body2">
            <span className={customStyles.alertIcon}>!&nbsp;</span>
            Information / Documents submitted here will be secured.
          </Typography>
          <br />
          <Typography variant="body2">
            <span className={customStyles.alertIcon}>!&nbsp;</span>
            Please contact our Team if any issues in uploading documents
          </Typography>
        </CardContent>
      </Card>
      <Typography className={customStyles.root}>
        If needed, use the following links to download the required documents:
        <br />
        <Link
          href="/static/img/1099_NEC_Expenses_Tax_Information.xlsx"
          className={customStyles.link}
        >
          1099 NEC Expenses Tax Information
        </Link>
        <br />
        <Link
          href="/static/img/City_Tax_Return_Information.xlsx"
          className={customStyles.link}
        >
          City Tax Return Information
        </Link>
        <br />
        <Link
          href="/static/img/Crypto_Information.xls"
          className={customStyles.link}
        >
          Crypto Information
        </Link>
        <br />
        <Link
          href="/static/img/FBAR_Information_2022.xls"
          className={customStyles.link}
        >
          FBAR Information
        </Link>
        <br />
        <Link
          href="/static/img/ITIN_Information.xls"
          className={customStyles.link}
        >
          ITN Information
        </Link>
        <br />
        <Link
          href="/static/img/Rental_Property_Details.xls"
          className={customStyles.link}
        >
          Rental Property Details
        </Link>
        <br />
        After downloading, please fill/complete these documents and upload them
        in the attachment section.
      </Typography>
      <Paper elevation={3} className={customStyles.info}>
        <Table width="100%">
          <TableBody>
            <TableRow valign="top">
              <StyledTableCell align="left" width="20%">
                Addition Information
              </StyledTableCell>
              <StyledTableCell width="5%"> - </StyledTableCell>
              <StyledTableCell align="left" width="75%">
                If you want to provide any additional information to your Tax
                Consultant, please discuss during the Tax Interview.
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: { xs: "20px" } }}
      >
        <Box sx={{ marginRight: "20px" }}>
          <input
            required
            id="import-file-button"
            type="file"
            onChange={handleUploadClick}
            accept=".xlsx"
            style={{ opacity: 0, visibility: "hidden", width: "1px" }}
          />
          <label htmlFor="import-file-button">
            <Button
              startIcon={<CloudUploadIcon />}
              component="span"
              variant="contained"
            >
              Choose File
            </Button>
          </label>
          <Typography sx={{ marginTop: "8px", fontStyle: "italic" }}>
            {state.selectedFile.name}
          </Typography>
        </Box>
        <Button onClick={handleUploadTaxDocs} sx={{ marginBottom: "10px" }}>
          Upload
        </Button>
      </Box>
      <Box>
        {state.isMyTaxDocsLoading ? (
          <CircularProgress />
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
                    File Name
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Upload Time
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    File Size
                  </StyledTableCell>
                  <StyledTableCell className={customStyles.tableHeader}>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.myTaxDocs.length > 0 &&
                  state.myTaxDocs.map((row, index) => (
                    <TableRow key={index}>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.file_name.replace(/^[^_]*_([^_]*_)/, "")}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.upload_time}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.tableData}>
                        {row.file_size}
                      </StyledTableCell>
                      <StyledTableCell className={customStyles.buttons}>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            disabled={isLoading}
                            startIcon={<GetApp />}
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              handleDownloadFile(row.file_name);
                            }}
                          >
                            Download{" "}
                            {isLoading && (
                              <CircularProgress sx={{ ml: 1 }} size={14} />
                            )}
                          </Button>
                          <Button
                            disabled={isLoading}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => {
                              handleDeleteFile(row.file_name);
                            }}
                          >
                            Delete{" "}
                            {isLoading && (
                              <CircularProgress sx={{ ml: 1 }} size={14} />
                            )}
                          </Button>
                        </Box>
                      </StyledTableCell>

                      <StyledTableCell className={customStyles.mobileView}>
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
                              File Name
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.file_name.replace(/^[^_]*_([^_]*_)/, "")}
                            </Typography>
                          </Box>
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Upload Time
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.upload_time}
                            </Typography>
                          </Box>

                          <Box sx={{ marginTop: "3px" }}>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              File Size
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.file_size}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              marginTop: "16px",
                            }}
                          >
                            <Button
                              disabled={isLoading}
                              startIcon={<GetApp />}
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                handleDownloadFile(row.file_name);
                              }}
                            >
                              Download{" "}
                              {isLoading && (
                                <CircularProgress sx={{ ml: 1 }} size={14} />
                              )}
                            </Button>
                            <Button
                              disabled={isLoading}
                              startIcon={<DeleteIcon />}
                              size="small"
                              onClick={() => {
                                handleDeleteFile(row.file_name);
                              }}
                            >
                              Delete{" "}
                              {isLoading && (
                                <CircularProgress sx={{ ml: 1 }} size={14} />
                              )}
                            </Button>
                          </Box>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {state.myTaxDocs.length === 0 && (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", margin: "10px 0" }}
              >
                No Records Found
              </Typography>
            )}
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default UploadTaxDocs;
