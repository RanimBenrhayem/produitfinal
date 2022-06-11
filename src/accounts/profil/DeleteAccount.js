



import * as React from "react";
import {
  List,
  TableCell,
  TableRow,
  TableBody,
  ListItemText,
  ListItem,
  Container,
  Pagination,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableFooter,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";




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
import {TiDeleteOutline} from "react-icons/ti"
import { FcComboChart } from "react-icons/fc";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

import LayoutHome from "../layout/LayoutHome";
import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";

export default function DeleteAccount() {
    const navigate = useNavigate();

    const [id, setId] = React.useState("");
    const handleDeleteUser = () => {
        Swal.fire({
          title: "Do You Realy Want To Delete Your Account?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:8080/user/deleteprofile/${id}`)
              .then((res) => {
                console.log(res.data);
                // setUsersCollection([res.data]);
                //setLisUpdated(!listUpdated);
                console.log("cbon");
                navigate("/");
                const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-right",
                  showConfirmButton: false,
                  timer: 1000,
                });
    
                Toast.fire({
                  icon: "success",
                  title: "Your Account Has Been Deleted Successfully !",
                });
              })
              .catch(function (error) {
                console.log(error);
                const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-right",
                  showConfirmButton: false,
                  timer: 1000,
                });
    
                Toast.fire({
                  icon: "error",
                  title: error,
                });
              });
          }
        });
      };

return (
  <div
      style={{
       
        width: "90%",
        height: 657,
        marginLeft : 100,
        marginTop : 200
      }}
    >
    
          <LayoutHome />
    <React.Fragment>
  
<Paper>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{ backgroundColor: "#e53935", borderColor: "#e53935" }}
            >
              <TableRow>
                <TableCell>
                  <div>
                    <RemoveCircleIcon
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 27,
                      }}
                    />
                  </div>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 15,
                      marginLeft: 40,
                      marginTop: -30,
                    }}
                  >
                    Delete Account
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Once you delete your account, there is no going back. Please
                  be certain. <br />
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ marginTop: 10, marginLeft: -40 }}
                    onClick={handleDeleteUser}
                  >
                    Delete Profil Now
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        </React.Fragment>

</div>
)}
