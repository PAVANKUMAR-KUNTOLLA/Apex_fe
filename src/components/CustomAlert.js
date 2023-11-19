import React from "react";
import { makeStyles } from "@mui/styles";
import { Snackbar } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    boxShadow: "-2px 5px 15px -2px rgba(0,0,0,0.71)",
  },
  alertContainer: {
    minWidth: 350,
  },
}));

const CustomAlert = ({ open, severity, alertTitle, alertText, onClose }) => {
  let vertical = "top",
    horizontal = "right";

  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      className={classes.root}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        className={classes.alertContainer}
      >
        {alertTitle ? <AlertTitle>{alertTitle}</AlertTitle> : null}
        {alertText}!
      </Alert>
    </Snackbar>
  );
};

CustomAlert.prototype = {
  open: PropTypes.bool,
  severity: PropTypes.string, //['success','warning', 'error']
  alertText: PropTypes.string,
  alertTitle: PropTypes.string,
  onClose: PropTypes.func,
};

export default CustomAlert;
