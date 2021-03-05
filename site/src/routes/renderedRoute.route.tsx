import React from "react";

import { Switch, BrowserRouter, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { CreateGlobalStyle } from "../ui/styles";

import { useTheme } from "../hooks";

import { routes } from "../constants";

import { PublicRoute } from "./publicRoute.route";
import { PrivateRoute } from "./privateRoute.route";

export const RenderRoute = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute
            exact
            path={routes.default.path}
            component={routes.default.component}
          />
          <PublicRoute
            exact
            path={routes.login.path}
            component={routes.login.component}
          />
          <PublicRoute
            exact
            path={routes.register.path}
            component={routes.register.component}
          />
          <PublicRoute
            exact
            path={routes.forgotPassword.path}
            component={routes.forgotPassword.component}
          />
          <PublicRoute
            exact
            path={routes.resetPassword.path}
            component={routes.resetPassword.component}
          />
          <PrivateRoute
            exact
            path={routes.dashboard.path}
            component={routes.dashboard.component}
          />
          <PrivateRoute
            exact
            path={routes.createCampaign.path}
            component={routes.createCampaign.component}
          />
          <Route
            path={routes.pageNotFound.path}
            component={routes.pageNotFound.component}
          />
        </Switch>
      </BrowserRouter>
      <CreateGlobalStyle />
    </ThemeProvider>
  );
};
