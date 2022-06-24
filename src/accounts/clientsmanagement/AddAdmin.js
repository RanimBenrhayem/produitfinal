import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";

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
  Tooltip,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function AddUser() {
  const [firstName, setFistName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/admin/addAdmin",
        data: {
          //donnees de la requete
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        },
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: response.data,
      });
      setFistName("");
      setLastName("");
      setPassword("");
      setPhoneNumber("");
      setEmail("");
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
  }

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
            <IconButton style={{ color: "#026aa4", marginLeft: 60 }}>
              <AddModeratorIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Add Administrators Section
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ padding: "2em 2em", boxShadow: 2 }}>
          <Box
            component="form"
            sx={{ mt: 5 }}
            onSubmit={handleSubmit}
            
          >
            <Grid container spacing={3}>
              <Grid item xs={15}>
                <Typography>First Name :</Typography>
                <TextField
                  style={{ marginTop: -40, marginLeft: 120, width: 300 }}
                  name="firstName"
                  required
                  //fullWidth
                  id="firstName"
                  //label="First Name"
                  value={firstName}
                  onChange={(e) => setFistName(e.target.value)}
                />
              </Grid>
              <Grid item xs={15}>
                <Typography style={{ marginTop: -70, marginLeft: 550 }}>
                  Last Name :
                </Typography>

                <TextField
                  style={{ marginTop: -40, marginLeft: 700, width: 300 }}
                  required
                  //fullWidth
                  id="lastName"
                  //label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginTop: -5, marginLeft: 550 }}>
                  Phone Number :
                </Typography>

                <TextField
                  style={{ marginTop: -35, marginLeft: 700, width: 300 }}
                  required
                  //fullWidth
                  id="phonenumber"
                  //label="Phone Number"
                  name="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 15 }}>
                      The Phone Number Should Be Composed Of 8 Figures
                    </Typography>
                  }
                >
                  <InfoIcon style={{ marginTop: -50, marginLeft: 15 }} />
                </Tooltip>
              </Grid>

              <Typography style={{ marginTop: -40, marginLeft: 25 }}>
                Email :
              </Typography>

              <Grid item>
                <TextField
                  style={{ marginTop: -75, marginLeft: 45, width: 300 }}
                  required
                  //fullWidth
                  id="email"
                  //label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={20}>
                <Typography>Password :</Typography>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 15 }}>
                      The Password Should Be Composed Of At Least 5 characters
                    </Typography>
                  }
                >
                  <InfoIcon style={{ marginTop: -40, marginLeft: 440 }} />
                </Tooltip>

                <TextField
                  required
                  style={{ marginTop: -50, marginLeft: -345, width: 300 }}
                  //fullWidth
                  name="password"
                  //label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item sm={5}>
                <Button
                  style={{ marginTop: -60, marginLeft: 600, width: 170 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  startIcon={<AddCircleIcon />}
                >
                  Add Admin
                </Button>
              </Grid>
              <Grid item sm={5}>
                <Button
                  style={{ marginTop: -60, marginLeft: 350, width: 170 }}
                  type="reset"
                  variant="outlined"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
             
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
