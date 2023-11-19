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
import CustomAlert from "../../../../components/CustomAlert";

import { makeStyles } from "@mui/styles";
import Api from "../../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../../components/PrivateRoute";
import financialYears from "../../../../mock-adapter/financialYears.json";
import SearchFiltersPage from "./SearchFilters";
import UsersDisplayPage from "./UsersDisplay";
import AppointmentUpdateConfirmationDialogBox from "./UpdateAppointment";
import { DataArray } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const SearchClientsPage = () => {
  const customStyles = customTextStyles();
  const [isLoadingSpin, setIsLoadingSpin] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "All",
    criteria: "Equals to",
    search: "",
    year: "All",
  });
  const [action, setAction] = useState({});

  const [isDeleteLoadingSpin, setIsDeleteLoadingSpin] = useState(false);
  const [isUserDetailsLoadingSpin, setIsUserDetailsLoadingSpin] =
    useState(false);
  const [associateDetails, setAssociateDetails] = useState([]);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const [isAppointmentUpdateLoadingSpin, setIsAppointmentUpdateLoadingSpin] =
    useState(false);
  const [
    isAppointmentUpdateConfirmationDialogBoxOpen,
    setIsAppointmentUpdateConfirmationDialogBoxOpen,
  ] = useState(false);
  const [appointmentDetailsData, setAppointmentDetailsData] = useState({
    appointmentId: "",
    date: "",
    time: "",
    type: "",
  });

  const handleFiltersChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFetchUpdateAppointment = (payload) => {
    setIsAppointmentUpdateLoadingSpin(true);
    privateApiPOST(
      payload.action === "update"
        ? Api.updateAppointment
        : Api.deleteAppointment,
      payload
    )
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setShowAlert({
            isAlert: true,
            alertText: data?.message,
            severity: "success",
          });
        }
        setIsAppointmentUpdateLoadingSpin(false);
        handleAppointmentDetailsUpdateDialogBoxClose();
        handleFetchUsers();
      })
      .catch((error) => {
        console.log("Error", error);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data?.message,
          severity: "error",
          alertTitle: "Error",
        });
        setIsAppointmentUpdateLoadingSpin(false);
        handleAppointmentDetailsUpdateDialogBoxClose();
      });
  };

  const handleFetchUsers = () => {
    let payload = { ...filters };
    setIsUserDetailsLoadingSpin(true);
    privateApiPOST(Api.users, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setUsers(data?.data);
        }
        setIsUserDetailsLoadingSpin(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data?.message,
          severity: "error",
          alertTitle: "Error",
        });
        setIsUserDetailsLoadingSpin(false);
      });
  };

  const handleAppointmentDetailsDataChange = (event) => {
    setAppointmentDetailsData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSetAppointmentDetailsUpdateDialogBoxOpen = (data, action) => {
    if (
      (action === "delete" &&
        data.filing.appointmentDate &&
        data.filing.appointmentTime) ||
      action === "update"
    ) {
      setAppointmentDetailsData((prev) => ({
        ...prev,
        appointmentId: data.filing.appointmentId,
        action: action,
      }));
      setIsAppointmentUpdateConfirmationDialogBoxOpen(true);
    } else if (!action && data.filing.taxFilingId) {
      navigate(
        `/app/tax-filing/${data.filing.taxFilingYear}/${data.filing.taxFilingId}/0`
      );
    }
  };

  const handleUpdateAppointmentDetails = () => {
    let data = { ...appointmentDetailsData };
    handleFetchUpdateAppointment(data);
  };

  const handleAppointmentDetailsUpdateDialogBoxClose = (event, reason) => {
    if (reason && reason == "backdropClick") {
      return;
    }
    setAppointmentDetailsData((prev) => ({
      ...prev,
      date: "",
      time: "",
      appointmentId: "",
      type: "",
    }));
    setIsAppointmentUpdateConfirmationDialogBoxOpen(false);
    setIsAppointmentUpdateLoadingSpin(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      handleFetchUsers();
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

      <SearchFiltersPage
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        handleFetchUsers={handleFetchUsers}
      />
      <UsersDisplayPage
        data={users}
        action={action}
        setAction={setAction}
        isUserDetailsLoadingSpin={isUserDetailsLoadingSpin}
        handleUpdateAppointmentDetails={
          handleSetAppointmentDetailsUpdateDialogBoxOpen
        }
      />
      <AppointmentUpdateConfirmationDialogBox
        data={appointmentDetailsData}
        handleDataChange={handleAppointmentDetailsDataChange}
        open={isAppointmentUpdateConfirmationDialogBoxOpen}
        handleClose={handleAppointmentDetailsUpdateDialogBoxClose}
        handleConfirm={handleUpdateAppointmentDetails}
        isLoadingSpin={isAppointmentUpdateLoadingSpin}
      />
    </Box>
  );
};

export default SearchClientsPage;
