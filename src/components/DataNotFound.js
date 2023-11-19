import React from "react";
import PropTypes from "prop-types";

import { Typography, Box } from "@mui/material";
import { IconReportSearch } from "@tabler/icons";

const DataNotFound = ({ message }) => {
  return (
    <Box
      textAlign="center"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <IconReportSearch
        strokeWidth={0.5}
        width={80}
        height={80}
        color={"#cdcdcd"}
      />
      <Typography
        variant={"h5"}
        textAlign="center"
        color="inherit"
        sx={{ fontWeight: 500, mt: 2, color: "#808594" }}
      >
        {message}
      </Typography>
    </Box>
  );
};

DataNotFound.propTypes = {
  message: PropTypes.string,
};

DataNotFound.defaultProps = {
  message: "No data matching the selected search criteria",
};
export default DataNotFound;
