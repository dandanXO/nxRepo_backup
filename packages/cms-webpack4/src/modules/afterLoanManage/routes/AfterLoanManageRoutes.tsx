import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { OverDueCollectionReport } from '../components/OverDueCollectionReport';

const AfterLoanManageRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path={'/afterLoanManage/overDueCollectionReport'} component={OverDueCollectionReport} />
    </Switch>
);

export default AfterLoanManageRoutes;
