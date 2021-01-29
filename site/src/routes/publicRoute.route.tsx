import React from 'react';

import { Route, RouteProps } from 'react-router-dom';

export const PublicRoute = ({ component, path }: RouteProps) => {
    
    return <Route path={path} component={component} />
};

  
