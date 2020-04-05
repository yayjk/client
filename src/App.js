import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import Journal from "./journal/Journal";
import Todo from "./todo/Todo";
import PrivateRoute, { LoggedInRoute } from "./utilities/PrivateRoute";
import Upload from "./upload/Upload";

function App() {
  let logIn_Out;
  let isLoggedIn = false;

  const door = () => {
    localStorage.setItem("login@yayjk.dev", false);
    window.location.reload();
  };

  if (localStorage.getItem("login@yayjk.dev") === "true") {
    isLoggedIn = true;
    logIn_Out = (
      <button id="logOutBtn" onClick={door}>
        Logout
      </button>
    );
  } else {
    isLoggedIn = false;
    logIn_Out = <span></span>;
  }

  return (
    <div className="App">
      <Router>
        <header id="mainHeader">
          <h1>
            <span id="logoO">Organizer</span>
            <span id="logoY">yayjk</span>
          </h1>
          <a href="/home">Home</a>
          <a href="/journal">Journal</a>
          <a href="/todo">Todo</a>
          <a href="/home">More</a>
          {logIn_Out}
        </header>
        <Switch>
          <PrivateRoute
            path="/home"
            exact
            component={Home}
            loggedIn={isLoggedIn}
          />
          <LoggedInRoute
            path="/"
            exact
            component={Login}
            loggedIn={!isLoggedIn}
          />
          <PrivateRoute
            path="/journal"
            exact
            component={Journal}
            loggedIn={isLoggedIn}
          />
          <PrivateRoute
            path="/todo"
            exact
            component={Todo}
            loggedIn={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/upload"
            component={Upload}
            loggedIn={isLoggedIn}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
