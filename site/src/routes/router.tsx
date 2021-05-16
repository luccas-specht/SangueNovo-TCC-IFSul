import React from "react";

import { Switch, BrowserRouter, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { CreateGlobalStyle } from "../ui/styles";

import { useTheme } from "../hooks";

import { ROUTES } from "../constants";

import { PublicRoute } from "./publicRoute.route";
import { PrivateRoute } from "./privateRoute.route";

export const Router = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PublicRoute
            exact
            path={ROUTES.default.path}
            component={ROUTES.default.component}
          />
          <PublicRoute
            exact
            path={ROUTES.login.path}
            component={ROUTES.login.component}
          />
          <PublicRoute
            exact
            path={ROUTES.register.path}
            component={ROUTES.register.component}
          />

          <PublicRoute
            exact
            path={ROUTES.forgotPassword.path}
            component={ROUTES.forgotPassword.component}
          />
          <PublicRoute
            exact
            path={ROUTES.resetPassword.path}
            component={ROUTES.resetPassword.component}
          />
          <PrivateRoute
            exact
            path={ROUTES.editProfile.path}
            component={ROUTES.editProfile.component}
          />
          <PrivateRoute
            exact
            path={ROUTES.detailsCampaign.path}
            component={ROUTES.detailsCampaign.component}
          />
          <PrivateRoute
            exact
            path={ROUTES.listFilterCampaings.path}
            component={ROUTES.listFilterCampaings.component}
          />
          <PrivateRoute
            exact
            path={ROUTES.createCampaign.path}
            component={ROUTES.createCampaign.component}
          />
          <PrivateRoute
            exact
            path={ROUTES.listMyCampaigns.path}
            component={ROUTES.listMyCampaigns.component}
          />
          <Route
            path={ROUTES.pageNotFound.path}
            component={ROUTES.pageNotFound.component}
          />
        </Switch>
      </BrowserRouter>
      <CreateGlobalStyle />
    </ThemeProvider>
  );
};
