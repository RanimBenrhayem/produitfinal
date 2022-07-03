import * as React from "react";
import {
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Table,
  TableHead,
  Paper,
  Button,
} from "@mui/material";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

import LayoutHome from "../layout/LayoutHome";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function DeleteAccount() {
    const navigate = useNavigate();
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
              .delete(`http://localhost:8080/user/deleteprofile`)
              .then((res) => {
                navigate("/");
                const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-right",
                  showConfirmButton: false,
                  timer: 1000,
                });
    
                Toast.fire({
                  icon: "success",
                  title: res.data,
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