import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPasword] = useState("");
  const { token } = useParams();
  console.log(token);
  const PostData = () => {
    fetch("http://localhost:8080/password/newpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
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

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <div style={{ marginTop: 130, marginLeft: 920 }}>
          <img
            src="https://branper.com/logo.png"
            alt=""
            style={{ width: 300, marginTop: -300 }}
          />

          <Typography
            className="typography1"
            variant="h4"
            style={{ marginTop: 30, marginLeft: -100 }}
          >
            Reset Your Password
            <br /> For
            <br /> Your Branper 2.0 Account
          </Typography>
        </div>
        <Container maxWidth="xs">
          <div style={{ marginTop: 100, marginLeft: 300 }}>
            <Box
              sx={{
                //marginTop: -100,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></Box>

            <Box component="form" sx={{ mt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    required
                    //fullWidth
                    style={{ width: 400, marginLeft: 100, marginTop: -20 }}
                    id="email"
                    label="Enter a new password !"
                    type="password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                  />
                </Grid>

                <Grid item sm={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={() => PostData()}
                    sx={{ mt: 2, mb: 5, width: 170, marginLeft: 22 }}
                  >
                    Save And Update
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Container>

        <img
          src="https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg?w=740&t=st=1653255390~exp=1653255990~hmac=4b428d4ff980f556029da56779b1de2ca7da1924c8dab9c37f03244df84b47c8"
          //src="https://anhhung.mobi/phan-khuc-khach-hang-la-gi/imager_7_3416_700.jpg"
          alt=""
          style={{ width: 800, height: 650, marginTop: -550, marginLeft: 10 }}
        />
      </div>
    </div>
  );
};

export default NewPassword;
/*
<input
          type="password"
          placeholder="enter a new password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
<button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Update password
        </button>*/