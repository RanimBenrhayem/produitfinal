import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

import "./reset.css";

import { useNavigate } from "react-router-dom";

//import SignUp from "../signup/SignUp";
function ResetPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8080/password/passwordreset", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
        if (data.error) {
          // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

          Toast.fire({
            icon: "error",
            title: `${data.error}`,
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

          Toast.fire({
            icon: "success",
            title: `${data.message}`,
          });

          //M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="containerreset">
      <div>
        <img
          src="forgot.png "
          alt=""
          style={{ width: 650, height: 500, marginTop: 60, marginLeft: -1100 }}
        />
      </div>
      {/*<div>
        <img
          src="backg12.png "
          alt=""
          style={{ width: 900, height: 600, marginTop: 3, marginLeft: -1135 }}
        />
  </div>*/}
      <Container maxWidth="xs">
        <div style={{ marginTop: -550, marginLeft: -1135 }}>
          <img src="Logo.png " className="logo" alt="" />
        </div>
        <div style={{ marginTop: 80, marginLeft: -600 }}>
          <Box
            sx={{
              //marginTop: -100,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
          <div style={{ marginLeft: 250 }}>
            <Typography className="typography1" variant="h4">
              Password Forgotten ?
            </Typography>
          </div>
          <br />
          <br />
          <br />

          <Box component="form" sx={{ mt: 0 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  //fullWidth
                  style={{ width: 400, marginLeft: 320 }}
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item sm={5}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, mb: 5, width: 170, marginLeft: 38 }}
                >
                  Reset Password
                </Button>
              </Grid>
              <Grid item sm={5}>
                <Button
                  type="reset"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2, mb: 2, width: 170, marginLeft: 22 }}
                >
                  Cancel
                </Button>
                <br />
                <br />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;
