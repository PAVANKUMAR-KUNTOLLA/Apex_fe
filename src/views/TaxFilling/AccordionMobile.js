import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Grid, Box, Avatar, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import BankDetails from "./Forms/bankDetails";
import FilerDetails from "./Forms/filerDeatils";
import IncomeDetails from "./Forms/incomeDetails";
import PickAppointment from "./Forms/pickAppointment";
import UploadTaxDocs from "./Forms/TaxDocs";
import TaxReturns from "./Forms/taxReturns";
import PayPalPayment from "../Home/payPalPayment";
import ConfirmDetails from "./Forms/confirmDetails";
import RefundQuote from "./Forms/refundQuote";

const customTextStyles = makeStyles((theme) => ({
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

const BasicAccordion = ({ data, handleFetchData, handleDownloadTemplate }) => {
  const customTextClasses = customTextStyles();
  const params = useParams();
  const [expanded, setExpanded] =
    parseInt(params.action) === 7 ? useState("panel7") : useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel);
    setExpanded(isExpanded ? panel : false);
  };

  const handlePickAppointment = () => {
    setExpanded("panel6");
  };

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel1" ? "600" : "400" }}
          >
            Filer Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilerDetails
            open={expanded === "panel1"}
            id={data["id"]}
            personalDetails={data["personalDetails"]}
            contactDetails={data["contactDetails"]}
            spouseDetails={data["spouseDetails"]}
            incomeDetails={data["incomeDetails"]}
            providedLivingSupport={data["providedLivingSupport"]}
            handleFetchData={handleFetchData}
            handleDownloadTemplate={handleDownloadTemplate}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel2" ? "600" : "400" }}
          >
            Income Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <IncomeDetails
            open={expanded === "panel2"}
            id={data["id"]}
            data={data["incomeDetails"]}
            handleFetchData={handleFetchData}
            handleDownloadTemplate={handleDownloadTemplate}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel3" ? "600" : "400" }}
          >
            Bank Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA", paddingLeft: "0px" }}>
          <BankDetails
            open={expanded === "panel3"}
            id={data["id"]}
            data={data["bankDetails"]}
            handleFetchData={handleFetchData}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
          className={customTextClasses.accordionHeader}
        >
          Upload Tax Docs
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <UploadTaxDocs open={expanded === "panel4"} id={data["id"]} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel5" ? "600" : "400" }}
          >
            Confirm Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <ConfirmDetails
            open={expanded === "panel5"}
            id={data["id"]}
            personalDetails={data["personalDetails"]}
            contactDetails={data["contactDetails"]}
            spouseDetails={data["spouseDetails"]}
            providedLivingSupport={data["providedLivingSupport"]}
            incomeDetails={data["incomeDetails"]}
            bankDetails={data["bankDetails"]}
            handlePickAppointment={handlePickAppointment}
            dependantDetails={data["dependantDetails"]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel6" ? "600" : "400" }}
          >
            Pick Appointment
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <PickAppointment open={expanded === "panel6"} id={data["id"]} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel7" ? "600" : "400" }}
          >
            Pay Now
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <PayPalPayment open={expanded === "panel7"} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8a-content"
          id="panel8a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel8" ? "600" : "400" }}
          >
            Tax Return
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <TaxReturns open={expanded === "panel8"} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
        className={customTextClasses.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9a-content"
          id="panel9a-header"
          className={customTextClasses.accordionHeader}
        >
          <Typography
            className={customTextClasses.accordionHeaderText}
            sx={{ fontWeight: expanded === "panel9" ? "600" : "400" }}
          >
            Refund Quote
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#FAFAFA" }}>
          <RefundQuote open={expanded === "panel9"} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BasicAccordion;
