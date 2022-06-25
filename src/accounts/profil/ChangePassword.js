import * as React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function ChangePassword() {
  const [cPassword, setCPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");

  const handleComparePass = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8080/user/comparePassword/${userId}`,
        data: {
          password: oldPassword,
        },
      });
      setOldPassword(oldPassword); 
      if (password.length > 5 && cPassword.length>5)  {
        if (password === cPassword) {
        handleChangePassword(e, userId);
        setCPassword("");
      } else{
        const Toast2 = Swal.mixin({
          toast: true,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast2.fire({
          icon: "error",
          title: "Oops...",
          text: ` The new password and the re-entred one do not match  `,
        });

      }
    } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: "Oops...",
          text: `length password must be >5 `,
        });
       
      }
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }
  };
  const handleChangePassword = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8080/user/setNewPassword/${userId}`,
        data: {
          password: password,
        },
      });
      setPassword("");
      setOldPassword("");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: response.data.data,
      });
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }
  };
  const handleOnSubmit = (e, userId) => {
    handleComparePass(e, userId);
  };
  return (
    <div
      style={{
        backgroundColor: "#eceff1",
        width: "100%",
        height: 657,
      }}
    >
      <LayoutHome />
      <Container
        width="sd"
        sx={{
          marginTop: 15,
          marginBottom: 5,
          marginLeft: 15,
        }}
      >
        <AppBar
          position="fixed"
          style={{ marginTop: 60, backgroundColor: "white" }}
        >
          <Toolbar>
            <IconButton style={{ marginLeft: 40 }}>
              <LockResetIcon style={{ color: "#026aa4", fontSize: 40 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Change Your Password
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          sx={{ padding: "2em 2em", boxShadow: 2 }}
          style={{ marginTop: -3 }}
        >
          <Box
            component="form"
            sx={{ mt: 5 }}
            onSubmit={handleOnSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 100 }}>
                  Old password :
                </Typography>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: 350, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password" 
                  id="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <br />
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 100 }}>
                  New Password :
                </Typography>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: 350, width: 300 }}
                  //fullWidth

                  name="password"
                  //label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <br />
              <Grid item xs={20}>
                <Typography style={{ marginLeft: 100 }}>
                  {" "}
                  Re-Enter New Password :
                </Typography>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: 350, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </Grid>

              <Grid item sm={5}>
                <Button
                  style={{ marginTop: 20, marginLeft: 320, width: 230 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Update and save
                </Button>
              </Grid>

              
              <img
                src="pass2.png"
                style={{ marginTop: -280, height: 200, marginLeft: 850 }}
              />
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
