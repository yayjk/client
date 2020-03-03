import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, loggedIn, ...props }) => {
  console.log(
    "Private route loggedIn>>>>>>>>>>>>>>" + JSON.stringify({ loggedIn })
  );
  return (
    <Route
      {...props}
      render={props => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "./",
              state: { referrer: props.location.pathname }
            }}
          />
        );
      }}
    />
  );
};

export const LoggedInRoute = ({ component: Component, loggedIn, ...props }) => {
  console.log(
    "Private route loggedIn>>>>>>>>>>>>>>" + JSON.stringify({ loggedIn })
  );
  return (
    <Route
      {...props}
      render={props => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { referrer: props.location.pathname }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
