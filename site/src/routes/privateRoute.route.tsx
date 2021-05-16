import { useState, useCallback } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { isAfter, addHours } from "date-fns";

import { usePrivateAccess, useAuthenticated } from "../hooks";

type StatusHttp = 401 | 200;

export const PrivateRoute = ({ component, path }: RouteProps) => {
  const { tokenIsAuthentication } = usePrivateAccess();
  const { signOut, authLastAuthenticatedTime } = useAuthenticated();

  const tokenHours = addHours(new Date(authLastAuthenticatedTime), 5);
  const [status, setStatus] = useState<StatusHttp>(200);

  const isValidToken = useCallback(async () => {
    try {
      const { status } = await tokenIsAuthentication();
      setStatus(status);
    } catch {
      setStatus(401);
    }
  }, [tokenIsAuthentication]);

  const logOff = useCallback(() => {
    signOut();
    return <Redirect to="/login" />;
  }, [signOut]);

  const renderRoute = () => {
    if (isAfter(new Date(), tokenHours)) isValidToken();

    if (status === 401) return logOff();

    return <Route path={path} component={component} />;
  };

  return renderRoute();
};
