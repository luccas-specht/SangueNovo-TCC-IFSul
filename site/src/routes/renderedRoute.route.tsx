import React from 'react';

import { Switch } from 'react-router-dom';

import { ROUTERS } from '../constants';

import { PublicRoute } from './publicRoute.route';
import { PrivateRoute } from './privateRoute.route';

 const RenderedRoute = () => (
    <Switch>
        <PublicRoute 
          path={ROUTERS.default.path}
          exact
          component={ROUTERS.default.component}
         />
        
        <PublicRoute
          path={ROUTERS.login.path}
          exact
          component={ROUTERS.login.component}
        />
        
        <PublicRoute 
          path={ROUTERS.register.path}
          exact
          component={ROUTERS.register.component}
         />
        
        <PublicRoute 
          path={ROUTERS.forgotPassword.path}  
          exact
          component={ROUTERS.forgotPassword.component}
        />

        <PrivateRoute 
          path={ROUTERS.dashboard.path}
          exact
          component={ROUTERS.dashboard.component}
        />
    </Switch >
);

export { RenderedRoute };