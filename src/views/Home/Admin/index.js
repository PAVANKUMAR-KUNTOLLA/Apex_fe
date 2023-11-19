import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material UI
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  Card,
  CircularProgress,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";

import config from "../../../config";
import { makeStyles } from "@mui/styles";

import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";
import SearchClientsPage from "./SearchClients";
import AssociatesListPage from "./AssociatesLIst";
import AddAssociatePage from "./AddAssociate";

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
  tabHeader: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    borderBottom: "1px solid #DDDDDD",
    whiteSpace: "nowrap",
    padding: "8px 10px",
  },
  tabButton: {
    display: "block",
    width: "95%",
    paddingLeft: "15px",
    textAlign: "left",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "10px 5px",
  },
}));

const AdminHomePage = () => {
  const customStyles = customTextStyles();
  let navigate = useNavigate();
  const params = useParams();
  const state = useSelector((state) => state.app);
  const [data, setData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLoadingSpin, setIsLoadingSpin] = useState(false);
  const [isActiveTab, setIsActiveTab] =
    parseInt(params.action) === 7
      ? useState("Pay Now")
      : useState("Search Clients");

  const handleActiveTabChange = (tabName) => {
    setIsActiveTab(tabName);
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={isMenuOpen ? 3 : 1}>
            <Card
              sx={{
                minHeight: isMenuOpen ? "320px" : "50px",
                borderRadius: "2px",
                marginRight: "10px",
              }}
            >
              <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon />
              </IconButton>

              {isMenuOpen && (
                <Box>
                  <Box
                    sx={{
                      border: "1px solid #D5D5D5",
                      margin: "10px 5px",
                    }}
                  >
                    <Typography className={customStyles.tabHeader}>
                      Manage Client Information
                    </Typography>
                    <Button
                      onClick={() => handleActiveTabChange("Search Clients")}
                      variant={
                        isActiveTab === "Search Clients" ? "contained" : "text"
                      }
                      className={customStyles.tabButton}
                      sx={{
                        color:
                          isActiveTab === "Search Clients" ? "#fff" : "#474747",
                      }}
                    >
                      Search Clients (New)
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid #D5D5D5",
                      margin: "30px 5px 10px",
                    }}
                  >
                    <Typography className={customStyles.tabHeader}>
                      Manage Associate Information
                    </Typography>
                    <Button
                      onClick={() => handleActiveTabChange("Associates List")}
                      variant={
                        isActiveTab === "Associates List" ? "contained" : "text"
                      }
                      className={customStyles.tabButton}
                      sx={{
                        color:
                          isActiveTab === "Associates List"
                            ? "#fff"
                            : "#474747",
                      }}
                    >
                      Associates List
                    </Button>
                    <Button
                      onClick={() => handleActiveTabChange("Add Associate")}
                      variant={
                        isActiveTab === "Add Associate" ? "contained" : "text"
                      }
                      className={customStyles.tabButton}
                      sx={{
                        color:
                          isActiveTab === "Add Associate" ? "#fff" : "#474747",
                      }}
                    >
                      Add Associate
                    </Button>
                  </Box>
                </Box>
              )}
            </Card>
          </Grid>
          <Grid item xs={isMenuOpen ? 9 : 11}>
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
            ) : data ? (
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,1)",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: "4px",
                  padding: "20px 10px",
                  height: "800px", // Adjust the height as needed
                  overflow: "auto", // Add overflow to enable scrolling
                  maxHeight: "800px", // Add a maximum height to prevent content from overflowing
                }}
              >
                <PerfectScrollbar>
                  {isActiveTab === "Search Clients" && <SearchClientsPage />}
                  {isActiveTab === "Associates List" && <AssociatesListPage />}
                  {isActiveTab === "Add Associate" && <AddAssociatePage />}
                </PerfectScrollbar>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminHomePage;
