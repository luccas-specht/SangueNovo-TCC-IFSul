import { Route, Redirect, RouteProps } from "react-router-dom";

import { useAuthenticated } from "../hooks";

export const PrivateRoute = ({ component, path }: RouteProps) => {
  const { user } = useAuthenticated();

  if (!user.token) return <Redirect to="/" />;

  return <Route path={path} component={component} />;
};
