import React from 'react';

import { Switch, BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { CreateGlobalStyle } from '../styles';

import { useTheme } from '../hooks'

import { ROUTERS } from '../constants';

import { PublicRoute } from './publicRoute.route';
import { PrivateRoute } from './privateRoute.route';

 const RenderedRoute = () => {
   const { theme } = useTheme();
   
   return(
   <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <PublicRoute 
          exact
          path={ROUTERS.default.path}
          component={ROUTERS.default.component}
         />
        
        <PublicRoute
          exact
          path={ROUTERS.login.path}
          component={ROUTERS.login.component}
        />
        
        <PublicRoute 
          path={ROUTERS.register.path}
          exact
          component={ROUTERS.register.component}
         />
        
        <PublicRoute 
          exact
          path={ROUTERS.forgotPassword.path} 
          component={ROUTERS.forgotPassword.component}
        />

         <PublicRoute 
          exact
          path={ROUTERS.resetPassword.path} 
          component={ROUTERS.resetPassword.component}
        />

        <PrivateRoute 
          exact
          path={ROUTERS.dashboard.path}
          component={ROUTERS.dashboard.component}
        />
      </Switch >
      </BrowserRouter>
      <CreateGlobalStyle/>
    </ThemeProvider >
);
   }

export { RenderedRoute };