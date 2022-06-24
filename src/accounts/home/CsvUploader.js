import React from "react";
import FileUploader from "../uploadfiles/UploadFiles";
import { FcComboChart } from "react-icons/fc";
import "../../styles/Home.css";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import Looks3Icon from "@mui/icons-material/Looks3";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LayoutHome from "../layout/LayoutHome";
import { styled, alpha } from "@mui/material/styles";
import { Button, Tooltip, Typography, Box } from "@material-ui/core";
import { CSVLink } from "react-csv";

import {
  ListItemText,
  ListItem,
  List,
  Divider,
  Dialog,
  Slide,
  IconButton,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import { VscFile } from "react-icons/vsc";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 2,
    marginTop: theme.spacing(1),
    minWidth: 200,
    backgroundColor: "#026aa4",
    color: theme.palette.mode === "light" ? "white" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  typography1: {
    color: "grey",
    marginLeft: 37,
    marginTop: -35,
  },

  dropezone: {
    color: "#026aa4",
    marginTop: -320,
    marginLeft: 15,

    width: 700,
  },
  iconarrow: {
    fontSize: 30,
    marginBottom: -6.25,
    color: "#026aa4",
  },
  title: {
    margin: theme.spacing(-14, 37),
  },

  contenu: {
    margin: theme.spacing(3.5, 12),
  },
}));
export default function DashboardHome() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const emplyees = [
    {
      name: "Said",
      age: 30,
      departement: "Management",
      location: "Tunisia",
    },
    {
      name: "Hamza",
      age: 30,
      departement: "IT",
      location: "Tunisia",
    },
    {
      name: "Amal",
      age: 20,
      departement: "IT",
      location: "France",
    },
    {
      name: "Ranim",
      age: 20,
      departement: "IT",
      location: "Tunisia",
    },
  ];
  const headers = [
    { label: "Name", key: "name" },
    {
      label: "Age",
      key: "age",
    },
    {
      label: "Departement",
      key: "departement",
    },
    { label: "Location", key: "location" },
  ];

  const csvLink = {
    headers: headers,
    data: emplyees,
    filename: "testcsvfile.csv",
  };
  return (
    <div className={classes.contenu}>
      <Box style={{ marginTop: 30 }}>
        <LayoutHome />
        <FcComboChart style={{ fontSize: 30 }} />
        <Typography variant="h6" component="h4" className={classes.typography1}>
          Data And Charts
          <ArrowRightIcon
            style={{ fontSize: 30 }}
            className={classes.iconarrow}
          />
          <ArrowRightIcon
            style={{
              fontSize: 30,
              marginLeft: 140,
              marginBottom: -7,
              color: "#026aa4",
            }}
          />
          <div style={{ marginLeft: 170, marginTop: -32 }}>
            <UploadFileIcon
              style={{
                fontSize: 30,
                color: "green",
              }}
            />
          </div>
          <div style={{ marginLeft: 340, marginTop: -39 }}>
            <VscFile
              style={{
                fontSize: 30,
                color: "#1de9b6",
              }}
            />
          </div>
          <div style={{ marginLeft: 205, marginTop: -38 }}>Upload Files</div>
          <div style={{ marginLeft: 380, marginTop: -32 }}>
            Upload Simple Files
          </div>
        </Typography>

        <img
          src="upload2.png"
          alt=""
          style={{ width: 300, marginLeft: 850, marginTop: 40 }}
        />
        <Tooltip
          title={
            <Typography style={{ fontSize: 14 }}>
              Click here to find out more about this application's
              functionalities.
            </Typography>
          }
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 40, marginLeft: 830 }}
            onClick={handleClickOpen}
          >
            Quick Start ?
          </Button>
        </Tooltip>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{ position: "relative" }}
            style={{ backgroundColor: "gray" }}
          >
            <Toolbar>
              <img src="Logo.png" alt="" style={{ width: 160 }} />
              <Typography
                sx={{ ml: 2, flex: 1 }}
                style={{ marginLeft: 300, color: "#e0f2f1" }}
                variant="h6"
                component="div"
              >
                Data management functionalities (Details)
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{ marginLeft: 380 }}
              >
                <CloseIcon style={{ fontSize: 32 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List style={{ marginTop: 70 }}>
            <ListItem>
              <LooksOneIcon
                style={{ marginTop: -70, fontSize: 30, color: "#026aa4" }}
              />
              <ListItemText
                primary={ //gras
                  <Typography variant="h6" component="div">
                    First Step
                  </Typography>
                }
                secondary={
                  <Typography>
                    Uploading Files: <br />- Upload a simple file. (Only
                    Comma-Separated-Values: CSV format files are allowed.)
                    <br />- Join two simple files already uploaded, based on two
                    identical attributes. (example: "client_email" and
                    "emplyee_email".)
                  </Typography>
                }
                style={{ marginLeft: 20 }}
              />
            </ListItem>
            <Divider /> {/*hr*/}
            <ListItem>
              <LooksTwoIcon
                style={{ marginTop: -20, fontSize: 30, color: "#026aa4" }}
              />
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    Second Step
                  </Typography>
                }
                secondary={<Typography>Manage uploaded files.</Typography>}
                style={{ marginLeft: 20 }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Looks3Icon
                style={{ marginTop: -20, fontSize: 30, color: "#026aa4" }}
              />

              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    Third Step
                  </Typography>
                }
                secondary={
                  <Typography>
                    Manage your dashboards based on your uploaded files.
                  </Typography>
                }
                style={{ marginLeft: 20 }}
              />
            </ListItem>
          </List>
        </Dialog>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          style={{ marginLeft: 50, marginTop: 39 }}
        >
          Hint ?
        </Button>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open2}
          onClose={handleClose2}
        >
          <MenuItem onClick={handleClose2} disableRipple>
            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Need
              Sample Data? <br />
              &nbsp;&nbsp;&nbsp;Use our sample dataset for a smooth
              start!&nbsp;&nbsp;&nbsp; <br />
              <br />
              <Button variant="outlined" style={{ backgroundColor: "white" }}>
                <CSVLink {...csvLink}>Download Sample Data</CSVLink>  {/*desctruction csv link*/}
              </Button>
              <br />
            </Typography>
          </MenuItem>
        </StyledMenu>
      </Box>
      <br /> <br />
      <div className={classes.dropezone}>
        <FileUploader />
      </div>
    
    </div>
  );
}
