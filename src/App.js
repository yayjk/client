import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import Journal from "./journal/Journal";
import Todo from "./todo/Todo";

function App() {
  return (
    <div className="App">
      <header id="mainHeader">
        <h1>
          <span id="logoO">Organizer</span>
          <span id="logoY">yayjk</span>
        </h1>
        <a href="./">Home</a>
        <a href="./journal">Journal</a>
        <a href="./todo">Todo</a>
        <a href="./">More</a>
        <a href="./login">Login</a>
      </header>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/journal" exact component={Journal} />
          <Route path="/todo" exact component={Todo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
