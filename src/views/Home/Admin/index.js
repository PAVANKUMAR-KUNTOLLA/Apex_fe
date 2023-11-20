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
  TableCell,
  styled,
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    backgroundColor: "#FFFFFF",
    borderWidth: "1px 0",
    borderStyle: "solid",
    borderColor: "#E2EBFF",
    "&:first-of-type": {
      borderLeftWidth: "1px",
    },
    "&:nth-last-of-type(2)": {
      borderRightWidth: "1px",
    },
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

  useEffect(() => {}, []);

  return (
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
      ) : data ? (
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,1)",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "4px",
            padding: "20px 10px",
            height: "1000px",
            overflow: "auto",
            maxHeight: "1000px",
          }}
        >
          <PerfectScrollbar>
            {params.adminAction === "clients" && <SearchClientsPage />}
            {params.adminAction === "associates_list" && <AssociatesListPage />}
            {params.adminAction === "add_associate" && <AddAssociatePage />}
          </PerfectScrollbar>
        </Box>
      ) : null}
      {/* </Grid>
        </Grid>
      </Container> */}
    </Box>
  );
};

export default AdminHomePage;
