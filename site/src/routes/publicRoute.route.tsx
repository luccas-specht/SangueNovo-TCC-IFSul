import { ComponentType } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { RouteComponentProps } from 'react-router';

import { useAuthenticated } from '../hooks';

import { paths } from '../constants';

type Props = {
    exact?: boolean;
    path: string;
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export const PublicRoute = ({
    component,
    path,
    exact = true
}: Props) => {
    const { user } = useAuthenticated();

    if([paths.login(), paths.default(), paths.register()].includes(path) && user?.token)
        return <Redirect to={paths.dashboard()}/>

    return <Route exact={exact} path={path} component={component}/>
}