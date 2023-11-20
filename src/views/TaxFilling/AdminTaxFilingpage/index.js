import React, { useEffect, useState } from "react";
import Page from "../../../components/Page";
import {
  Grid,
  Container,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import TabsDesktop from "../TabsDesktop";
import { makeStyles } from "@mui/styles";
import PerfectScrollbar from "react-perfect-scrollbar";

import Api from "../../../components/Api";
import {
  privateApiGET,
  privateApiPOST,
} from "../../../components/PrivateRoute";

export const customTextStyles = makeStyles((theme) => ({
  tabButton: {
    display: "block",
    width: "100%",
    paddingLeft: "15px",
    textAlign: "left",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
  },
}));

const AdminTaxFillingPage = () => {
  const params = useParams();
  const customStyles = customTextStyles();
  const [data, setData] = useState({});
  const [isLoadingSpin, setIsLoadingSpin] = useState(true);

  const handleFetchTaxFilingDetails = () => {
    setIsLoadingSpin(true);
    let payload = { id: params.id };
    privateApiPOST(Api.taxFiling, payload)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setData(data?.data);
          setIsLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoadingSpin(false);
      });
  };

  const handleDownloadTemplate = (file) => {
    let payload = {
      file_name: file,
    };

    privateApiPOST(Api.templateDownload, payload, { responseType: "blob" })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const url = window.URL.createObjectURL(new Blob([data]));
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.setAttribute("download", file);
          document.body.appendChild(anchor);
          anchor.click();
        } else {
        }
      })
      .catch((err) => {
        console.log("handleDownloadFile--->", err);
      });
  };

  useEffect(() => {
    handleFetchTaxFilingDetails();
  }, []);

  return (
    <Page title={"Tax Filing"}>
      <Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                top: "10%",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : data ? (
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,1)",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                borderRadius: "4px",
                padding: "20px 10px",
                height: "800px", // Adjust the height as needed
                overflow: "auto", // Add overflow to enable scrolling
                maxHeight: "800px", // Add a maximum height to prevent content from overflowing
              }}
            >
              <PerfectScrollbar>
                <Typography
                  variant="h3"
                  sx={{
                    marginLeft: "20px",
                  }}
                >
                  Tax-Filing For Year - {params.year}
                </Typography>

                <TabsDesktop
                  data={data}
                  handleFetchData={handleFetchTaxFilingDetails}
                  handleDownloadTemplate={handleDownloadTemplate}
                />
              </PerfectScrollbar>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Page>
  );
};

export default AdminTaxFillingPage;
