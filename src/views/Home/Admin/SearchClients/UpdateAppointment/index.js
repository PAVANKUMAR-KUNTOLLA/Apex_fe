import React from "react";
import {
  Button,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  IconButton,
  Typography,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

import CustomInputTextField from "../../../../../components/CustomInputField";

const customTextStyles = makeStyles((theme) => ({
  dialogBox: {
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "20px 20px 0px 0px",
      border: "1px solid rgba(151,151,151, 1)",
      boxShadow: "0px -3px 8px rgba(0,0,0, 0.1)",
    },
  },
  quantityRow: {
    margin: "32px auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left",
    maxWidth: "230px",
    [theme.breakpoints.down("sm")]: {
      margin: "24px 20px 40px",
    },
  },
  boldText: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "24px",
    marginBottom: "7px",
  },
  paymentOption: {
    "& .MuiFormControlLabel-label": {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "19px",
      marginBottom: "4px",
    },
  },
  activePaymentOption: {
    "& .MuiFormControlLabel-label": {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "19px",
      marginBottom: "7px",
    },
  },
  normalText: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
  },
  headerText: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "23px",
  },
  mainText: {
    opacity: 1,
    color: "rgba(71,71,71,1)",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: "33px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "27px",
      marginLeft: "8px",
      marginRight: "7px",
    },
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "97.5%",
    top: "-4%",
    backgroundColor: "#F5A623",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      left: "93%",
      top: "-5%",
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  confirmButton: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "19px",
    color: "#FFFFFF",
    padding: "10px 40px 9px",
    marginBottom: "4px",
  },
}));

const AppointmentUpdateConfirmationDialogBox = ({
  data,
  handleDataChange,
  open,
  handleClose,
  handleConfirm,
  isLoadingSpin,
}) => {
  const customStyles = customTextStyles();

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hours = 11; hours <= 23; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hourStr = String(hours).padStart(2, "0");
        const minuteStr = String(minutes).padStart(2, "0");
        const timeOption = `${hourStr}:${minuteStr}`;
        timeOptions.push(timeOption);
      }
    }
    return timeOptions;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: customStyles.paper }}
      className={customStyles.dialogBox}
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography
          sx={{ fontSize: "24px", fontWeight: 600, color: "#474747" }}
        >
          {data.action === "update"
            ? "Update Appointment Details"
            : "Delete Appointment"}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={false}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={customStyles.customizedButton}
        >
          <CloseIcon />
        </IconButton>
        {data.action === "update" ? (
          <Box
            sx={{ minWidth: { xs: "360px", sm: "480px" }, margin: "30px 20px" }}
          >
            <Box sx={{ margin: "4px 0" }}>
              <CustomInputTextField
                attributeMarginTop="12px"
                attribute="Appointment Date"
                is_required={false}
                type="date"
                name="date"
                value={data.date}
                onChange={handleDataChange}
                fullWidth
                required
              />
            </Box>
            <Box sx={{ margin: "4px 0" }}>
              <CustomInputTextField
                attributeMarginTop="12px"
                attribute="Appointment Time"
                is_required={false}
                select
                name="time"
                // label="Time"
                value={data.time}
                onChange={handleDataChange}
                variant="outlined"
                fullWidth
                required
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomInputTextField>
            </Box>
          </Box>
        ) : data.action === "delete" ? (
          <Box sx={{ margin: { xs: "0 0 32px", sm: "32px 152px 32px" } }}>
            <Typography className={customStyles.mainText}>
              Are you sure you want to delete your appointment?
            </Typography>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="text"
            className={customStyles.confirmButton}
            onClick={handleClose}
            sx={{ marginRight: "15px", color: "#474747 !important" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={customStyles.confirmButton}
            onClick={handleConfirm}
            sx={{ textTransform: "uppercase" }}
          >
            {data.action}
            {isLoadingSpin && (
              <CircularProgress
                size={15}
                color="primary"
                sx={{ marginLeft: "15px" }}
              />
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentUpdateConfirmationDialogBox;
