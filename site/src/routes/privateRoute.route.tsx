import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRoute = ({ component, path }: RouteProps) => {
    const isToken = localStorage.getItem('@SangueNovo:token');
      
    if (!isToken) return <Redirect to="/"/>
    
    return <Route path={path} component={component} />
};