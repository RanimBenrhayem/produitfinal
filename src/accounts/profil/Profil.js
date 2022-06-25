import * as React from "react";
import { Avatar } from "@material-ui/core";
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
import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function Profil() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    handleOnClickOpen();
  }, []); //composant s'affiche sur l'ecran donc dependency array is empty

  const handleOnClickOpen = async (userId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/user/profilInfo/${userId}`,
      });
      const { _id, firstName, lastName, email, phoneNumber } = response.data;
      setId(_id);
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phoneNumber);
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8080/user/updateuser/${id}`, 
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
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
    } catch (error) {
      console.log(error);
      const Toast2 = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast2.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      }).then(function () {});
    }
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
            <IconButton style={{ marginLeft: 60 }}>
              <Avatar style={{ color: "#026aa4" }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Edit Your Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Paper
          sx={{ padding: "2em 2em", boxShadow: 2 }}
          style={{ marginTop: 9, height: 300 }}
        >
          <Box component="form" sx={{ mt: 5 }} onSubmit={handleUpdateUser}>
            <Grid container spacing={3}>
              <Grid item xs={5} style={{ marginTop: -10 }}>
                <Typography>First Name :</Typography>
                <TextField
                  style={{ marginTop: -40, marginLeft: 120, width: 300 }}
                  name="firstName"
                  required
                  //fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={15}>
                <Typography style={{ marginTop: -70, marginLeft: 550 }}>
                  Last Name :
                </Typography>

                <TextField
                  style={{ marginTop: -35, marginLeft: 700, width: 300 }}
                  required
                  id="lastName"
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
                <Tooltip title="The Phone Number Should Be Composed Of 8 Figures">
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

              <Grid item sm={5}>
                <Button
                  style={{ marginTop: 10, marginLeft: -90, width: 200 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Save And Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
      </Container>
    </div>
  );
}