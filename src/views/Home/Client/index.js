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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { makeStyles } from "@mui/styles";
import taxServicesData from "../../../mock-adapter/taxServicesData.json";
import DrawerAppBar from "../../../Layout/MainLayout/appBarMaterialUI";

import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";

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
      // marginBottom: "8px",
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

const ClientHomePage = () => {
  const customStyles = customTextStyles();
  let navigate = useNavigate();
  const state = useSelector((state) => state.issue);
  const [myServices, setMyServices] = useState([]);
  const [taxYearServices, setTaxYearServices] = useState([]);
  const [isMyServicesLoading, setIsMyServicesLoading] = useState(false);
  const [isTaxYearsLoading, setIsTaxYearsLoading] = useState(false);
  const [currSelectedYear, setCurrSelectedYear] = useState("");
  const dispatch = useDispatch();

  const handleNavigate = (value) => {
    let path = value;
    navigate(path);
  };

  const handleCurrYearTaxServiceChange = (event) => {
    setCurrSelectedYear(event.target.value);
  };

  const handleAddTaxServiceChange = () => {
    setIsMyServicesLoading(true);
    let payload = { new: true, year: currSelectedYear };
    privateApiPOST(Api.myServices, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setMyServices(data?.data);
          setIsMyServicesLoading(false);
          setCurrSelectedYear("");
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsMyServicesLoading(false);
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
      <Container maxWidth="lg">
        <Typography className={customStyles.headerText}>
          My Selected Services
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
                <TableCell className={customStyles.tableHeader}>ID</TableCell>
                <TableCell className={customStyles.tableHeader}>
                  SERVICE TYPE
                </TableCell>
                <TableCell className={customStyles.tableHeader}>YEAR</TableCell>
                <TableCell className={customStyles.tableHeader}>
                  STATUS
                </TableCell>
                <TableCell className={customStyles.tableHeader}>
                  ACTIONS
                </TableCell>
                <TableCell className={customStyles.tableHeader}>
                  PAY NOW
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myServices.length > 0 &&
                myServices.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className={customStyles.tableData}>
                      {row.id}
                    </TableCell>
                    <TableCell className={customStyles.tableData}>
                      {row.service_type}
                    </TableCell>
                    <TableCell className={customStyles.tableData}>
                      {row.year}
                    </TableCell>
                    <TableCell className={customStyles.tableData}>
                      {row.status}
                    </TableCell>
                    <TableCell className={customStyles.tableData}>
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
                    </TableCell>
                    <TableCell className={customStyles.tableData}>
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
                    </TableCell>
                    <TableCell className={customStyles.mobileView}>
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
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              id
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.id}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Year
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.year}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Service Type
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
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
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Status
                            </Typography>

                            <Typography
                              className={customStyles.mobileViewTableCellValue}
                            >
                              {row.status}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Actions
                            </Typography>
                            <Typography
                              className={customStyles.mobileViewTableCellValue}
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
                              className={customStyles.mobileViewTableCellHeader}
                            >
                              Pay Now
                            </Typography>
                            <Typography
                              className={customStyles.mobileViewTableCellValue}
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              className={customStyles.headerText}
            >
              Select Tax Service
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={currSelectedYear}
              onChange={handleCurrYearTaxServiceChange}
              color="secondary"
            >
              <Grid container>
                {taxYearServices.length > 0 &&
                  taxYearServices.map((each, id) => (
                    <Grid item xs={4} key={id} sx={{ marginLeft: "30px" }}>
                      <FormControlLabel
                        value={each.name}
                        control={<Radio />}
                        label={
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                            }}
                          >
                            {`${each.name} - Tax Filing`}
                          </div>
                        }
                      />
                    </Grid>
                  ))}
              </Grid>
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => currSelectedYear && handleAddTaxServiceChange()}
            variant="contained"
            className={customStyles.confirmButton}
            color="secondary"
            sx={{
              opacity:
                // isLoadingSpin ||
                !currSelectedYear ? 0.5 : 1,
              marginLeft: "12px",
              marginTop: "10px",
              display: "block",
            }}
          >
            Add Service{"  "}
            {/* {isLoadingSpin && (
                <CircularProgress
                  size={15}
                  color="primary"
                  sx={{ marginLeft: "15px" }}
                />
              )} */}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientHomePage;
