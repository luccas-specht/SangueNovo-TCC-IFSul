import { useState, useEffect, useCallback } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { usePrivateAccess, useAuthenticated } from "../hooks";

type StatusHttp = 102 | 401 | 200;

export const PrivateRoute = ({ component, path }: RouteProps) => {
  const [status, setStatus] = useState<StatusHttp>(102);

  const { signOut } = useAuthenticated();
  const { tokenIsAuthentication } = usePrivateAccess();

  const logOff = useCallback(() => {
    signOut();
    return <Redirect to="/login" />;
  }, [signOut]);

  const isValidToken = useCallback(async () => {
    try {
      const { status } = await tokenIsAuthentication();
      setStatus(status);
    } catch {
      setStatus(401);
    }
  }, [tokenIsAuthentication]);

  const renderRoute = useCallback(() => {
    if (status === 102) return <div />;

    if (status === 401) return logOff();

    return <Route path={path} component={component} />;
  }, [status, logOff, path, component]);

  useEffect(() => {
    isValidToken();
  }, []);

  return renderRoute();
};
