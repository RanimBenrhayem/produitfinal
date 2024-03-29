import GoogleLogin from "react-google-login";
import axios from "../googlesignin/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import React from "react";

function Google() {
  const navigate = useNavigate();
  async function responseSuccessGoogle(response) {
    console.log(response);
    try {
      axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/user/googlesignin",
        data:
          //donnees de la requete
          { tokenId: response.tokenId, email: response.email },
      }).then((response) => {
        console.log("Google login with success", response);
        navigate("/Dashboard");
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "You Have Logged un Successfully With Google !",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const responseErrorGoogle = (response) => {
    "error";
  };

  return (
    /*<Route>
      {response ? (
        <Link to="/signup" />
      ) : ( */
    <GoogleLogin
      clientId="1080158334920-r61g9qlgbdent0sahg9uq9umjgfh18di.apps.googleusercontent.com"
      buttonText="Sign up with Google"
      onSuccess={responseSuccessGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={"single_host_origin"}
      theme="dark"
    />
    /*)}
    </Route> */
  );
}

export default Google;
