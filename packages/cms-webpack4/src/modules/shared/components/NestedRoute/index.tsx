import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

interface NestedRouteProps {
    routes: {
        path: string;
        component: React.LazyExoticComponent<any>;
        exact?: boolean;
    }[];
}

const NestedRoute = ({ routes }: NestedRouteProps): JSX.Element => {
    const { path } = useRouteMatch();

    return (
        <>
            {routes.map((route) => (
                <Route
                    exact={route.exact}
                    key={`${path}${route.path}`}
                    path={`${path}${route.path}`}
                    render={(props) => <route.component {...props} />}
                />
            ))}
        </>
    );
};

export default NestedRoute;
