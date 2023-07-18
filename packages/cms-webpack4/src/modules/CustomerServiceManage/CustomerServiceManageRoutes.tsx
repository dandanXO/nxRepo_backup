import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CustomerServiceManage } from './components/CustomerServiceManage';

const CustomerServiceManageRoutes = (): JSX.Element => (
    <Switch>
        <Route path={'/CustomerServiceManage/CustomerServiceManage'} component={CustomerServiceManage} />
    </Switch>
);

export default CustomerServiceManageRoutes;
