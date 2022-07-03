import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import axios from "axios"; //pour l'envoie des requetes
import Google from "../googlesignin/Google";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../../contexts/authContext";
import { Link } from "react-router-dom";

//import SignUp from "../signup/SignUp";
function SignIn() {
  const {loggingIn} = useAuthContext() 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [redirect, setRedirect] = useState(true);
  async function handleSubmitSignin(e) {
    e.preventDefault();
    try {
      const response = await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/user/signin",
        data: {
          //donnees de la requete
          email: email,
          password: password,
        },
      });
      loggingIn(response.data.token , response.data.role) //fonction qui va enregistrer le token dans localstorage
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}` ; //token envoyé avec chaque requete à travers un header authorization
      if(response.data.role ==="client") {
        navigate("/csvUploader");

      } else {
        navigate("/Users");

      }
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: response.data.msg,
      });
   
      setPassword("");
      setEmail("");
    } catch (error) {
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: `${error.response.data}`,
      });
    }
  
  }

  return (
    <div>
      <Container className="containersignin" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <Typography className="typography1" variant="h3">
          Welcome Back...
        </Typography>
        <br />
        <Box component="form" sx={{ mt: 0 }} onSubmit={handleSubmitSignin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="password"
                type="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item sm={5}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item sm={5}>
              <Button
                type="reset"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Cancel
              </Button>
              <br />
              <br />
              <Button
                  style={{ marginLeft:-90, marginTop: -10, width: 230 }}
                  component={Link}
                  variant="outlined"
                 
                  to={"/ResetPassword"}
                  //fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Forgot Your Password ?
                </Button>
              
               
              <br />
              <div>
                <Grid item sm={30} className="btngoogle">
                  <Google />
                </Grid>
              </div>
              <br />
              <br />
              <Typography className="typography2" variant="p">
                OR
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;