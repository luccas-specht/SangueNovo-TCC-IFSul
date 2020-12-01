import React from 'react';
import { Switch} from 'react-router-dom';

import { routers } from '../constants';
import { RenderRoute } from './render-route';

const RouteManger = (): JSX.Element => {
  const mapRoutes = (): JSX.Element[] => (
    routers.map(
      (route, key) =>
        <RenderRoute
          exact
          key={key}
          path={route.path}
          isPublic={route.isPublic}
          component={route.component}
        />
     )
  );
  return <Switch>{ mapRoutes() }</Switch>;
};

export { RouteManger };
