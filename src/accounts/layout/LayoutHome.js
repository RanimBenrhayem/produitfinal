import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Drawer, Box, Tooltip } from "@material-ui/core";

import Divider from "@material-ui/core/Divider";
import Home from "./ToolBarIcons";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Menu2 from "./Menu";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  // toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingLeft: 80,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#026aa4",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9.1),
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, -4),
    ...theme.mixins.toolbar,
    width: 50,
  },
  logo: {
    width: 200,
    maxHeight: 130,
    margin: theme.spacing(-0.5, 3, -7.5),
  },
  menuicon: {
    marginRight: 45,
  },
}));

export default function LayoutHome() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = () => <Menu2 />;

  return (
    <div>
      {["left"].map((anchor, index) => (
        <React.Fragment key={index}>
          <AppBar className={clsx(classes.appBar)} position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(anchor, true)}
                edge="start"
              >
                <MenuIcon style={{ fontSize: 30, marginLeft: -15 }} />
              </IconButton>
              <Home />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Typography variant="h6" noWrap>
                Data Visualisation
              </Typography>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div
              className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
              })}
              role="presentation"
              onClick={toggleDrawer(anchor, true)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <img src="Logo.png" alt="logo" className={classes.logo} />
              <div className={classes.toolbar} />

              <Divider />
              {list(true)}
            </div>
          </SwipeableDrawer>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerClose]: true,
            })}
            classes={{
              paper: clsx({
                [classes.drawerClose]: true,
              }),
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
