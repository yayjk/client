import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, loggedIn, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/organize/login",
              state: { referrer: props.location.pathname },
            }}
          />
        );
      }}
    />
  );
};

export const LoggedInRoute = ({ component: Component, loggedIn, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/organize/home",
              state: { referrer: props.location.pathname },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
