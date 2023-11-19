import React, { useEffect, useState, useRef } from "react";
import config from "../../config";
// Material UI
import { Grid, Box, Avatar, Typography, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PercentIcon from "@mui/icons-material/Percent";
import Groups from "@mui/icons-material/Groups";
import ListAlt from "@mui/icons-material/ListAlt";
import AspectRatioOutlined from "@mui/icons-material/AspectRatioOutlined";
import UnfoldLess from "@mui/icons-material/UnfoldLess";
import UnfoldMore from "@mui/icons-material/UnfoldMore";
import DiscountOutlined from "@mui/icons-material/DiscountOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import InsertPageBreakOutlined from "@mui/icons-material/InsertPageBreakOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import StackedBarChartOutlined from "@mui/icons-material/StackedBarChartOutlined";
import PriceCheckOutlined from "@mui/icons-material/PriceCheckOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FilerDeatils from "./Forms/filerDeatils";
import IncomeDetails from "./Forms/incomeDetails";
import BankDetails from "./Forms/bankDetails";
import ConfirmDetails from "./Forms/confirmDetails";
import PickAppointment from "./Forms/pickAppointment";
import PayPalPayment from "../Home/payPalPayment";
import TaxReturns from "./Forms/taxReturns";
import UploadTaxDocs from "./Forms/TaxDocs";

export const customTextStyles = makeStyles((theme) => ({
  accordion: {
    marginBottom: "8px",
    borderRadius: "10px",
    "&.MuiPaper-elevation": {
      boxShadow: "none !important",
    },
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  accordionHeader: {
    opacity: 1,
    paddingLeft: "12px",
    paddingTop: "8px",
    paddingBottom: "8px",
    maxHeight: "60px",
  },
  accordionHeaderText: {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#474747",
  },
  accordionColumn: {
    marginTop: "24px",
  },
  accordionColumnHeaderText: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "600",
    marginTop: "10px",
    marginBottom: "4px",
  },
  accordionColumnText: {
    fontSize: "13px",
    lineHeight: "19px",
    fontWeight: "400",
  },
  footerText: {
    opacity: 0.8,
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "19px",
    marginTop: "26px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  collpaseIcon: {
    // height: "9px",
    // width: "9px",
    opacity: 1,
    color: "#474747",
  },
}));

const TabsDesktop = ({ data, handleFetchData, handleDownloadTemplate }) => {
  const params = useParams();
  const customTextClasses = customTextStyles();
  const [value, setValue] = useState(parseInt(params.action));

  console.log(params.action);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "64px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          margin: "8px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Filer Details"
            className={customTextClasses.tabHeaderText}
            {...a11yProps(0)}
          />
          <Tab
            label="Income Details"
            className={customTextClasses.tabHeaderText}
            {...a11yProps(1)}
          />
          <Tab
            label="Bank Details"
            className={customTextClasses.tabHeaderText}
            {...a11yProps(2)}
          />
          <Tab
            label="Upload Tax Docs"
            className={customTextClasses.tabHeaderText}
            {...a11yProps(3)}
          />
          <Tab
            label="Tax Returns"
            className={customTextClasses.tabHeaderText}
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <FilerDeatils
          id={data["id"]}
          personalDetails={data["personalDetails"]}
          contactDetails={data["contactDetails"]}
          spouseDetails={data["spouseDetails"]}
          incomeDetails={data["incomeDetails"]}
          providedLivingSupport={data["providedLivingSupport"]}
          handleFetchData={handleFetchData}
          handleDownloadTemplate={handleDownloadTemplate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IncomeDetails
          id={data["id"]}
          data={data["incomeDetails"]}
          handleFetchData={handleFetchData}
          handleDownloadTemplate={handleDownloadTemplate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BankDetails
          id={data["id"]}
          data={data["bankDetails"]}
          handleFetchData={handleFetchData}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <UploadTaxDocs id={data["id"]} />
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <TaxReturns id={data["id"]} />
            </Box>
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
};
export default TabsDesktop;
