import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import DrawerAppBar from "./appBarMaterialUI";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { Grid, Box, CircularProgress } from "@mui/material";
import { setUserInfo } from "../../redux/app/appSlice";
import NavBar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 190,
      paddingRight: 30,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    padding: "30px 20px",
  },
}));

const AppLayout = () => {
  const classes = useStyles();
  const { initialAppLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoadingSpin, setIsLoadingSpin] = useState(true);

  const handleFetchProfileData = () => {
    setIsLoadingSpin(true);
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setUserInfo(data?.data));
          setIsLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoadingSpin(false);
      });
  };

  useEffect(() => {
    handleFetchProfileData();
  }, []);

  return (
    <>
      {!initialAppLoading && (
        <div>
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
                top: 0,
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <div className={classes.root}>
              <DrawerAppBar />
              <NavBar />
              <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                  <div className={classes.content}>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppLayout;
