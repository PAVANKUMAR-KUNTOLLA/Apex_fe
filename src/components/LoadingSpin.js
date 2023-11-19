import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: "#fff",
  },
}));

const LoadingSpin = ({ isBackdrop }) => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={isBackdrop}>
        <Box
          display="flex"
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            // backgroundColor: "background.paper",
            zIndex: "10",
            left: 0,
            top: 0,
          }}
        >
          <CircularProgress color="inherit" size={40} />
        </Box>
      </Backdrop>
    </div>
  );
};

LoadingSpin.prototype = {
  isBackdrop: PropTypes.bool,
};

export default LoadingSpin;
