import React, { useState } from "react";
import { ListItem, ListItemIcon, List, Tooltip } from "@material-ui/core";
import Warning from "@material-ui/icons/Warning";
import Logout from "./Logout";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {FcLineChart,FcBarChart} from "react-icons/fc"
import PieChartIcon from "@mui/icons-material/PieChart";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { BsPersonLinesFill } from "react-icons/bs";
import { VscFile, VscFiles, VscTasklist, VscChecklist } from "react-icons/vsc";
import { FcComboChart } from "react-icons/fc";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
export default function Menu2() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen2(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const handleClick5 = () => {
    setOpen5(!open5);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
  };
  const handleClick7 = () => {
    setOpen7(!open7);
  };

  const handleClick8 = () => {
    setOpen7(!open8);
  };

  return (
    <React.Fragment>
      <List>
        <Tooltip
          title={
            <Typography style={{ fontSize: 15 }}>Data And Charts</Typography>
          }
        >
          <ListItem
            button // component={Link} to={"/Dashboard"}
            onClick={handleClick}
          >
            <ListItemIcon>
              <FcComboChart
                style={{ color: "#009688", marginLeft: 1, fontSize: 27 }}
              />
              <Typography style={{ color: "black", marginLeft: 33 }}>
                Data And Charts
              </Typography>
            </ListItemIcon>

            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Upload Files</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                onClick={handleClick4}
                //component={Link}
                //to={"/UploadedFilesList"}
              >
                <ListItemIcon>
                  <UploadFileIcon style={{ color: "green", fontSize: 27 }} />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Upload Files
                  </Typography>
                </ListItemIcon>
                {open4 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Upload Simple File
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 13 }}
                    component={Link}
                    to={"/CsvUploader"}
                  >
                    <ListItemIcon>
                      <VscFile
                        style={{
                          marginLeft: 8,
                          fontSize: 23,
                          color: "#1de9b6",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Upload Simple File
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>Join Files</Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 13 }}
                    component={Link}
                    to={"/JoinProcess"}
                  >
                    <ListItemIcon>
                      <VscFiles
                        style={{
                          marginLeft: 8,
                          fontSize: 23,
                          color: "#8bc34a",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Join Files
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </List>
            </Collapse>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Uploaded Files List
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                onClick={handleClick5}
                style={{ marginLeft: 13 }}
              >
                <ListItemIcon>
                  <FormatListBulletedIcon
                    style={{ color: "#ff5722", fontSize: 27 }}
                  />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Uploaded Files List
                  </Typography>
                </ListItemIcon>
                {open5 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>
            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Simple Files List
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 13 }}
                    component={Link}
                    to={"/UploadedSimpleFilesList"}
                  >
                    <ListItemIcon>
                      <VscTasklist
                        style={{
                          marginLeft: 8,
                          fontSize: 23,
                          color: "#795548",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Simple Files List
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Joined Files List
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 13 }}
                    component={Link}
                    to={"/JoinedFilesList"}
                  >
                    <ListItemIcon>
                      <VscChecklist
                        style={{
                          marginLeft: 8,
                          fontSize: 23,
                          color: "#D2691E",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Joined Files List
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </List>
            </Collapse>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Dashboards</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 17 }}
                onClick={handleClick7}
                // component={Link}
                //to={"/Dashboard"}
              >
                <ListItemIcon>
                  <PieChartIcon
                    style={{
                      color: "#ffd740",
                      fontSize: 23,
                      marginLeft: -3.5,
                    }}
                  />
                </ListItemIcon>
                <Typography> Dashboards</Typography>
                {open7 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>
            <Collapse in={open7} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Simple Files Dashboard
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/Dashboard"}
                  >
                    <ListItemIcon>
                      <ShowChartIcon
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#8A2BE2",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Simple Files <br />
                        Dashboard
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Joined Files Dashboard
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/joinedDashboard"}
                  >
                    <ListItemIcon>
                      <StackedLineChartIcon
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#ff4081",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Joined Files <br />
                        Dashboard
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                     Dashboard list for simple files
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/DashboardsList"}
                  >
                    <ListItemIcon>
                      <FcLineChart
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#8A2BE2",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                      Dashboard list  <br />
                        for simple files
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Dashboard list for joined files
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/joinedDashboardsList"}
                  >
                    <ListItemIcon>
                      <FcBarChart
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#8A2BE2",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                      Dashboard list for <br />
                        Joined files
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </List>
            </Collapse>
          </List>
        </Collapse>
       
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Warnings</Typography>}
        >
          <ListItem button  >
            <ListItemIcon>
              <Warning style={{ color: "red", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Warnings</Typography>
            {open8 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open8} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Warning Simple Files
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/DashboardsList"}
                  >
                    <ListItemIcon>
                      <ShowChartIcon
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#8A2BE2",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                       Warning simple files
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12 }}>
                      Warning join files
                    </Typography>
                  }
                >
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    style={{ marginLeft: 10 }}
                    component={Link}
                    to={"/DashboardsList"}
                  >
                    <ListItemIcon>
                      <ShowChartIcon
                        style={{
                          marginLeft: -3,
                          //marginTop: 10,
                          fontSize: 23,
                          color: "#8A2BE2",
                        }}
                      />
                      <Typography style={{ color: "black", marginLeft: 40 }}>
                        Warning join files
                      </Typography>
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
        </List>
        </Collapse>
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}> Manage Users</Typography>}
        >
          <ListItem button onClick={handleClick2}>
            <ListItemIcon>
              <PeopleIcon style={{ color: "#1a237e", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Manage Users</Typography>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Add Simple User
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/AddUser"}
              >
                <ListItemIcon>
                  <PersonAddIcon style={{ color: "#448aff", fontSize: 27 }} />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Add Simple User
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>

            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>
                  Add Administrator
                </Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/AddAdmin"}
              >
                <ListItemIcon>
                  <AddModeratorIcon
                    style={{ color: "#588d9c", fontSize: 23 }}
                  />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Add Administrator
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip
              title={
                <Typography style={{ fontSize: 12 }}>Users List</Typography>
              }
            >
              <ListItem
                button
                sx={{ pl: 6 }}
                style={{ marginLeft: 13 }}
                component={Link}
                to={"/Users"}
              >
                <ListItemIcon>
                  <BsPersonLinesFill
                    style={{
                      color: "#9e8bca",
                      fontSize: 23,
                      marginLeft: 2,
                    }}
                  />
                  <Typography style={{ color: "black", marginLeft: 33 }}>
                    Users List
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Comments</Typography>}
        >
          <ListItem button component={Link} to={"/Comments"}>
            <ListItemIcon>
              <AddCommentIcon style={{ color: "#db996c", fontSize: 27 }} />
            </ListItemIcon>
            <Typography> Comments</Typography>
          </ListItem>
        </Tooltip>
        <Divider />
        <Tooltip
          title={<Typography style={{ fontSize: 15 }}>Your Profile</Typography>}
        >
          <ListItem
            button // component={Link} to={"/Dashboard"}
            onClick={handleClick6}
          >
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                style={{ color: "#009688", fontSize: 30 }}
              />
              <Typography style={{ color: "black", marginLeft: 33 }}>
                Your Profile
              </Typography>
            </ListItemIcon>

            {open6 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
        <Collapse in={open6} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Tooltip
              title={
                <Typography style={{ fontSize: 15 }}>
                  Edit Your Profile
                </Typography>
              }
            >
              <ListItem button component={Link} to={"/YourProfil"}>
                <ListItemIcon>
                  <img
                    src="editprofile6.webp"
                    alt=""
                    style={{ width: 28, marginLeft: 13 }}
                  />
                  {/*<AccountCircleOutlinedIcon
                    style={{ color: "#009688", fontSize: 27, marginLeft: 13 }}
                  />*/}
                  <Typography
                    title="Your Profile"
                    style={{ color: "black", marginLeft: 34 }}
                  >
                    Edit Profile
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip
              title={
                <Typography style={{ fontSize: 15 }}>
                  Change Password
                </Typography>
              }
            >
              <ListItem button component={Link} to={"/ChangePassword"}>
                <ListItemIcon>
                  <LockResetIcon
                    style={{ fontSize: 33, marginLeft: 10, color: "#ab47bc" }}
                  />
                  {/*<AccountCircleOutlinedIcon
                    style={{ color: "#009688", fontSize: 27, marginLeft: 13 }}
                  />*/}
                  <Typography
                    title="Change Your Password"
                    style={{ color: "black", marginLeft: 30 }}
                  >
                    Change Password
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>
      </List>
      <Logout />
    </React.Fragment>
  );
}