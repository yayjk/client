import React from "react";
import "./login.css";

function Login() {
  const handleLogin = e => {
    const pw = document.getElementById("password").value;
    if (pw !== "") {
      if (pw === "develop") {
        localStorage.setItem("login@yayjk.dev", true);
        window.location.reload();
      } else {
        document.getElementById("loginSpin").style.display = "block";
      }
    }
  };

  return (
    <div className="container" id="loginScreen">
      <input type="password" id="password" placeholder="Enter password" />
      <button onClick={handleLogin}>Login</button>
      <span id="loginSpin" style={{ display: "none" }}>
        Wrong password
      </span>
    </div>
  );
}

export default Login;
