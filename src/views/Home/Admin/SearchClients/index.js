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
import SearchFiltersPage from "./SearchFilters";
import UsersDisplayPage from "./UsersDisplay";
import AppointmentUpdateConfirmationDialogBox from "./UpdateAppointment";
import { useNavigate } from "react-router-dom";
import RefundPage from "./Refund";

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
  const [isRefundDetailsLoadingSpin, setIsRefundDetailsLoadingSpin] =
    useState(false);
  const [associateDetails, setAssociateDetails] = useState([]);
  const [showAlert, setShowAlert] = useState({
    isAlert: false,
    alertTitle: "",
    alertText: "",
    severity: "",
  });

  const [isRefundPageOpen, setIsRefundPageOpen] = useState(false);
  const [refundData, setRefundData] = useState([]);

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

  const [isAddRefundActive, setIsAddRefundActive] = useState(false);
  const [addRefundData, setAddRefundData] = useState([
    {
      id: "",
      name: "",
      year: "",
      service_type: "REGULAR",
      refund_type: "FEDERAL REFUND",
      standard_refund: 0,
      standard_fee: 0,
      itemized_refund: 0,
      itemized_fee: 0,
      discount: 0,
      paid_advance: 0,
      max_itemized_refund: 0,
      max_itemized_fee: 0,
    },
  ]);

  const handleAddRefundDataChange = (id, label, value) => {
    console.log(id, label, value);
    if (label === "year") {
      {
        console.log("year");

        addRefundData.map((each, id) =>
          setAddRefundData((prev) => [...prev, { ...prev[id], [label]: value }])
        );
      }
    } else {
      console.log(addRefundData[id]);
      setAddRefundData((prev) =>
        prev.map((item, index) => {
          if (index === id) {
            return { ...item, [label]: value };
          }
          return item;
        })
      );
    }
  };

  const handleAddOneMoreRefundData = () => {
    if (isAddRefundActive) {
      setAddRefundData((prev) => [
        ...prev,
        {
          ...prev[0],
          refund_type: "FEDERAL REFUND",
          standard_refund: 0,
          standard_fee: 0,
          itemized_refund: 0,
          itemized_fee: 0,
          discount: 0,
          paid_advance: 0,
          max_itemized_refund: 0,
          max_itemized_fee: 0,
        },
      ]);
    } else {
      setIsAddRefundActive(true);
    }
  };

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

  const handleFetchRefundDetails = (id) => {
    let payload = { id: id };
    setIsRefundDetailsLoadingSpin(true);
    privateApiPOST(Api.refunds, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setRefundData(data?.data);
        }
        setIsRefundDetailsLoadingSpin(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data?.message,
          severity: "error",
          alertTitle: "Error",
        });
        setIsRefundDetailsLoadingSpin(false);
      });
  };

  const handleFetchAddRefund = () => {
    setIsRefundDetailsLoadingSpin(true);
    let payload = [...addRefundData];
    privateApiPOST(Api.createRefund, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setShowAlert({
            isAlert: true,
            alertText: data?.message,
            severity: "success",
          });
          setAddRefundData((prev) => [
            {
              ...prev[0],
              refund_type: "FEDERAL REFUND",
              standard_refund: 0,
              standard_fee: 0,
              itemized_refund: 0,
              itemized_fee: 0,
              discount: 0,
              paid_advance: 0,
              max_itemized_refund: 0,
              max_itemized_fee: 0,
            },
          ]);
          setIsAddRefundActive(false);
        }
        setIsRefundDetailsLoadingSpin(false);
        handleFetchRefundDetails(addRefundData[0].id);
      })
      .catch((error) => {
        console.log("Error", error);
        setShowAlert({
          isAlert: true,
          alertText: error.response.data?.message,
          severity: "error",
          alertTitle: "Error",
        });
        setIsRefundDetailsLoadingSpin(false);
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
    } else if ((!action || action === "view") && data.filing.taxFilingId) {
      navigate(
        `/app/tax-filing/${data.filing.taxFilingYear}/${data.filing.taxFilingId}/0`
      );
    } else if (action === "refund" && data.id) {
      setIsRefundPageOpen(true);
      setAddRefundData([
        {
          ...addRefundData[0],
          id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          year: "2023",
        },
      ]);
      handleFetchRefundDetails(data.id);
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

  useEffect(() => {
    setIsAddRefundActive(false);
    setIsRefundPageOpen(false);
    setAddRefundData([
      {
        id: "",
        name: "",
        year: "",
        service_type: "REGULAR",
        refund_type: "FEDERAL REFUND",
        standard_refund: 0,
        standard_fee: 0,
        itemized_refund: 0,
        itemized_fee: 0,
        discount: 0,
        paid_advance: 0,
        max_itemized_refund: 0,
        max_itemized_fee: 0,
      },
    ]);
  }, [users]);

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
      <RefundPage
        open={isRefundPageOpen}
        data={refundData}
        isAddRefundActive={isAddRefundActive}
        handleAddRefund={handleAddOneMoreRefundData}
        addRefundData={addRefundData}
        handleAddRefundDataChange={handleAddRefundDataChange}
        handleFetchAddRefund={handleFetchAddRefund}
        isLoadingSpin={isRefundDetailsLoadingSpin}
      />
    </Box>
  );
};

export default SearchClientsPage;
