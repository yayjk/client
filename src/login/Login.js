import React from "react";
import "./login.css";

function Login() {
  const handleLogin = e => {
    const pw = document.getElementById("password").value;
    if (pw !== "") {
      document.getElementById("loginSpin").style.display = "block";
      console.log(pw);
    }
  };
  return (
    <div className="container" id="loginScreen">
      <input type="password" id="password" placeholder="Enter password" />
      <button onClick={handleLogin}>Login</button>
      <div
        className="spinner-grow "
        id="loginSpin"
        role="status"
        style={{ display: "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Login;
