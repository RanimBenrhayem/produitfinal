import * as React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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

import axios from "axios";
import Swal from "sweetalert2";
import LayoutHome from "../layout/LayoutHome";

export default function AddUser() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFistName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/user/signup",
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
              <PersonAddIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              style={{ color: "#026aa4", marginLeft: 60 }}
            >
              Add Simple Users Section
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ padding: "2em 2em", boxShadow: 2 }}>
          <Box
            component="form"
            sx={{ mt: 5 }}
            onSubmit={handleSubmit}
            //style={{ marginLeft: 220, marginTop: 80, width: 1000 }}
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

              <Grid item xs={20}>
                <Typography>Password :</Typography>
                <Tooltip title="The Password Should Be Composed Of At Least 5 characters">
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
                  style={{ marginTop: -60, marginLeft: 600, width: 180 }}
                  type="submit"
                  variant="contained"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  startIcon={<AddCircleIcon />}
                >
                  Add Simple User
                </Button>
              </Grid>
              <Grid item sm={5}>
                <Button
                  style={{ marginTop: -60, marginLeft: 350, width: 180 }}
                  type="reset"
                  variant="outlined"
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  onClick={handleClose}
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
/*
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        //requete
        method: "POST",
        url: "http://localhost:5000/user/signup",
        data: {
          //donnees de la requete
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          //role: role,
        },
      });
      setFistName("");
      setLastName("");
      setPassword("");
      setPhoneNumber("");
      setEmail("");
      //setRole("");
      Swal.fire({
        title: "Your account has been successfully created !",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddCircleIcon />}
      >
        Add new user
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 0 }} onSubmit={handleSubmit}>
            <Grid justifyContent="space-between" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  type="text"
                  required
                  name="First Name"
                  value={firstName}
                  onChange={(e) => setFistName(e.target.value)}

                  //value={formValues.password}
                  //onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  type="text"
                  required
                  name="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  //value={formValues.password}
                  //onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                  //value={formValues.password}
                  //onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  type="string"
                  required
                  name="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  //value={formValues.password}
                  //onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //value={formValues.password}
                  //onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel>Role :</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="User"
                      control={<Radio />}
                      label="User"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions style={{ marginRight: 240 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );*/

/*import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const RegisterDialogForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  return (
    <>
      <Button onClick={() => setShowRegisterForm(!showRegisterForm)}>
        Register
      </Button>
      <Dialog
        open={showRegisterForm}
        fullWidth
        onClose={() => setShowRegisterForm(false)}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  type="text"
                  required
                  fullWidth
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  required
                  fullWidth
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  type="tel"
                  name="phone"
                  required
                  fullWidth
                  value={formValues.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  required
                  name="password"
                  fullWidth
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => setShowRegisterForm(false)}
                  disableElevation
                >
                  Close
                </Button>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disableElevation
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default RegisterDialogForm;
*/
