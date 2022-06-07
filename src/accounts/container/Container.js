import React, { useState } from "react";
import SignUp from "../signup/SignUp";
import SignIn from "../signin/SignIn";
import "../../styles/accounts.css";

function Container() {
  //useState
  const [welcome, setWelcome] = useState(true);

  return (
    <div className="container1">
      <img src="Logo.png " className="logo" alt="" />
      <button className="buttonsignup1" onClick={() => setWelcome(!welcome)}>
        {welcome ? (
          "New to us? Sing Up"
        ) : (
          <div className="buttonsignin2">Already a member ? Sign In</div>
        )}
      </button>
      <div>{welcome ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}
export default Container;
