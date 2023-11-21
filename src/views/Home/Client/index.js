import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
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
  Chip,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { makeStyles } from "@mui/styles";
import taxServicesData from "../../../mock-adapter/taxServicesData.json";
import DrawerAppBar from "../../../Layout/MainLayout/appBarMaterialUI";
import CustomAlert from "../../../components/CustomAlert";

import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";

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
      // marginBottom: "8px",
      display: "none",
    },
  },
  headerText: {
    color: "rgba(71,71,71,1)",
    fontSize: "24px",
    fontWeight: 400,
    lineHeight: "33px",
    margin: "30px 0 20px",
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    backgroundColor: "#FFFFFF",
    borderWidth: "1px 0",
    borderStyle: "solid",
    borderColor: "#E2EBFF",
    "&:first-of-type": {
      borderWidth: "1px",
    },
    "&:nth-last-of-type(2)": {
      borderRightWidth: "1px",
    },
  },
}));

const ClientHomePage = () => {
  const customStyles = customTextStyles();
  let navigate = useNavigate();
  const state = useSelector((state) => state.issue);
  const [myServices, setMyServices] = useState([]);
  const [taxYearServices, setTaxYearServices] = useState([]);
  const [isMyServicesLoading, setIsMyServicesLoading] = useState(false);
  const [isTaxYearsLoading, setIsTaxYearsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const handleNavigate = (value) => {
    let path = value;
    navigate(path);
  };

  const handleAddTaxServiceChange = (year) => {
    setIsMyServicesLoading(true);
    let payload = { new: true, year: year };
    privateApiPOST(Api.myServices, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setMyServices(data?.data);
          setIsMyServicesLoading(false);
          setShowAlert({
            isAlert: true,
            severity: "success",
            alertText: data?.["message"],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsMyServicesLoading(false);
        const { data } = error.response;
        setShowAlert({
          isAlert: true,
          severity: "error",
          alertText: data?.["message"],
        });
      });
  };

  const handleFetchTaxYearServices = () => {
    setIsTaxYearsLoading(true);
    privateApiGET(Api.taxYears)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setTaxYearServices(data?.data);
          setIsTaxYearsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsTaxYearsLoading(false);
      });
  };

  const handleFetchMyServices = () => {
    setIsMyServicesLoading(true);
    privateApiGET(Api.myServices)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setMyServices(data?.data);
          setIsMyServicesLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsMyServicesLoading(false);
      });
  };

  useEffect(() => {
    handleFetchTaxYearServices();
    handleFetchMyServices();
  }, []);

  return (
    <Box>
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
      <Box
        sx={{
          marginTop: "25px",
        }}
      >
        <Typography className={customStyles.headerText}>
          Tax Services
        </Typography>
        <Grid container>
          {taxYearServices.length > 0 &&
            taxYearServices.map((taxYear) => {
              const isSelected = myServices.some(
                (service) => service.year === taxYear.name
              );

              return (
                <Grid item xs={3} key={taxYear.id} sx={{ margin: "0 15px" }}>
                  <Box
                    sx={{
                      padding: "24px 16px 16px 24px",
                      boxShadow: "0px 0px 4px rgba(0,0,0, 0.060315)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      opacity: 1,
                      backgroundColor: "rgba(255,255,255, 1)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        marginTop: "8px",
                        alignItems: "center",
                      }}
                    >
                      {isSelected ? (
                        <Chip
                          label={"Selected"}
                          size="small"
                          color={"success"}
                        />
                      ) : (
                        <Chip
                          label={
                            <Button startIcon={<AddIcon />}>Add Service</Button>
                          }
                          size="small"
                          color={"info"}
                          onClick={() =>
                            handleAddTaxServiceChange(taxYear.name)
                          }
                          sx={{
                            backgroundColor: "#fff",
                            "&:hover": {
                              backgroundColor: "#fff",
                            },
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        lineHeight: "25px",
                        fontWeight: 700,
                        color: "rgb(71,71,71)",
                        minWidth: "150px",
                        margin: "20px 0",
                      }}
                    >
                      {`${taxYear.name} - Tax Filing`}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Box>
        <Typography className={customStyles.headerText}>
          My Selected Services
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
                  ID
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  SERVICE TYPE
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  YEAR
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  STATUS
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  ACTIONS
                </StyledTableCell>
                <StyledTableCell className={customStyles.tableHeader}>
                  PAY NOW
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myServices.length > 0 &&
                myServices.map((row, index) => (
                  <TableRow key={index}>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.service_type}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.year}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      <Link
                        to={`../tax-filing/${row.year}/${row.id}/0`}
                        onClick={() =>
                          handleNavigate(
                            `../tax-filing/${row.year}/${row.id}/0`
                          )
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        Start Process
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.tableData}>
                      <Link
                        to={`../tax-filing/${row.year}/${row.id}/7`}
                        onClick={() =>
                          handleNavigate(
                            `../tax-filing/${row.year}/${row.id}/7`
                          )
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        Pay Now
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell className={customStyles.mobileView}>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginTop: "16px",
                          }}
                        >
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              id
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.id}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Year
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.year}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Service Type
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.service_type}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginTop: "16px",
                          }}
                        >
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Status
                            </Typography>

                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              {row.status}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Actions
                            </Typography>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              <Link
                                to={`../tax-filing/${row.year}/${row.id}/0`}
                                onClick={() =>
                                  handleNavigate(
                                    `../tax-filing/${row.year}/${row.id}/0`
                                  )
                                }
                                sx={{ cursor: "pointer" }}
                              >
                                Start Process
                              </Link>
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellHeader
                              }
                            >
                              Pay Now
                            </Typography>
                            <Typography
                              className={
                                customStyles.mobileViewStyledTableCellValue
                              }
                            >
                              <Link
                                to={`../tax-filing/${row.year}/${row.id}/7`}
                                onClick={() =>
                                  handleNavigate(
                                    `../tax-filing/${row.year}/${row.id}/7`
                                  )
                                }
                                sx={{
                                  cursor: "pointer",
                                }}
                              >
                                Pay Now
                              </Link>
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
      </Box>
    </Box>
  );
};

export default ClientHomePage;
