import React, { useState, useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { usePrivateAccess } from "../hooks";

export const PrivateRoute = ({ component, path }: RouteProps) => {
  const [state, setState] = useState("loading");
  const { tokenIsAuthentication } = usePrivateAccess();

  useEffect(() => {
    (async function () {
      try {
        const { status } = await tokenIsAuthentication();
        setState(status === 200 ? "loggedin" : "redirect");
      } catch {
        setState("redirect");
      }
    })();
  }, [tokenIsAuthentication]);

  if (state === "loading") {
    return <div>Loading...</div>;
  } else if (state === "loggedin") {
    return <Route path={path} component={component} />;
  }

  return <Redirect to="/login" />;
};
