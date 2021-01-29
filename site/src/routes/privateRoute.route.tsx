import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRoute = ({ component, path }: RouteProps) => {
    // validar onde salvar o token
    const isToken = localStorage.getItem('token salvo no localStorage');
      
    if (!isToken) return <Redirect to="/"/>
    
    return <Route path={path} component={component} />
};