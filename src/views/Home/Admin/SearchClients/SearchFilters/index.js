import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import financialYears from "../../../../../mock-adapter/financialYears.json";

const SearchFiltersPage = ({
  filters,
  handleFiltersChange,
  handleFetchUsers,
}) => {
  return (
    <Box
      sx={{
        margin: "10px",
        border: "1px solid #DDDDDD",
        padding: "20px 20px 40px",
      }}
    >
      <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
        Search Criteria
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <select
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFiltersChange}
            style={{ minHeight: "25px", padding: "5px" }}
          >
            <option value="All">All</option>
            <option value="Appointment Date">Appointment Date</option>
            <option value="Recent Clients">Recent Clients</option>
            <option value="Last Name">Last Name</option>
            <option value="First Name">First Name</option>
            <option value="Email Id">Email Id</option>
          </select>
        </Grid>
        <Grid item xs={3}>
          <select
            id="criteria"
            name="criteria"
            value={filters.criteria}
            onChange={handleFiltersChange}
            style={{ minHeight: "25px", padding: "5px" }}
          >
            {/* Add an empty option */}
            <option value="Equals to">Equals to</option>
            <option value="Greater than and Equals to">
              Greater than and Equals to
            </option>
            <option value="Contains">Contains</option>
          </select>
        </Grid>
        <Grid item xs={3}>
          <input
            name="search"
            onChange={handleFiltersChange}
            value={filters.search}
            style={{
              maxWidth: "160px",
              minHeight: "25px",
              padding: "5px",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleFiltersChange}
            style={{ minHeight: "25px", padding: "5px" }}
          >
            {financialYears.map((each, id) => (
              <option key={id} value={each}>
                {each}
              </option>
            ))}
          </select>
        </Grid>
        <Grid item xs={1}>
          <button
            onClick={handleFetchUsers}
            style={{ minHeight: "25px", padding: "5px" }}
          >
            GO
          </button>
        </Grid>
      </Grid>
      <Typography
        color={"red"}
        sx={{
          textAlign: "center",
          marginTop: "2px",
        }}
      >
        Note : Appointment Date Search format - MM/dd/YYYY
      </Typography>
    </Box>
  );
};

export default SearchFiltersPage;
