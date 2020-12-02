import React from 'react';

import { Route, RouteProps } from 'react-router-dom';

const PublicRoute = ({ component, path }: RouteProps) => {
    
    return <Route path={path} component={component} />
};

export { PublicRoute };
  
