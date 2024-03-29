import { ComponentType } from "react";

import { Route, Redirect } from "react-router-dom";

import { RouteComponentProps } from "react-router";

import { useAuthenticated } from "../hooks";

import { PATHS } from "../constants";

type Props = {
  exact?: boolean;
  path: string;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
};

export const PublicRoute = ({ component, path, exact = true }: Props) => {
  const { user } = useAuthenticated();

  if (user?.token) return <Redirect to={PATHS.orderCampaigns()} />;

  return <Route exact={exact} path={path} component={component} />;
};
