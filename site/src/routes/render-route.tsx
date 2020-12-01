import React from 'react';

import { Route, 
         Redirect, 
         RouteProps } from 'react-router-dom';

interface RouteAuthProps extends RouteProps {
  component: any;
  path: string | string[] | undefined;
  isPublic: boolean;
}

const RenderRoute = ({ component, path, isPublic }: RouteAuthProps) => {
  const token = localStorage.getItem('@GoBarber:token');
  
  if(isPublic){
    if (token) return <Redirect to="/dashboard" />
    
    return <Route path={path} component={component}/> 
   
  }else{
    if (!token) return <Redirect to="/" />

    return <Route path={path} component={component}/> 
  }
};

export { RenderRoute }
