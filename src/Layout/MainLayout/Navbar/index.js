import * as React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  ListItem,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import { ClientUserRoutes, AdminUserRoutes } from "./AppRoutes";
import NavItem from "./NavItem";
import { capitalizeString } from "../../../utils";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useSelector } from "react-redux";
import Api from "../../../components/Api";
import { privateApiPOST } from "../../../components/PrivateRoute";
import { ExitToApp } from "@mui/icons-material";

export const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 84,
    height: "calc(100% - 84px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
  logo: {
    width: 110,
    padding: 10,
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
    "&.active": {
      color: "#9c44c0",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const state = useSelector((state) => state.app);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    privateApiPOST(Api.logout)
      .then((response) => {
        const { status } = response;
        if (status === 204) {
          sessionStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          to="/app/profile"
        >
          {state.first_name ? state.first_name[0].toUpperCase() : null}
        </Avatar>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          Welcome Back,
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {state.first_name
            ? `${state.first_name} ${state.last_name}`
                .split(" ")
                .map((d) => capitalizeString(d))
                .join(" ")
            : null}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {state.role && state.role === "CLIENT"
            ? ClientUserRoutes.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))
            : null}
          {state.role && state.role === "ADMIN"
            ? AdminUserRoutes.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))
            : null}
          <ListItem disablePadding>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={handleLogout}
            >
              <ExitToApp className={classes.icon} size="20" />
              <span className={classes.title}>Logout</span>
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  profileData: PropTypes.object,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
  profileData: {},
};

export default NavBar;
