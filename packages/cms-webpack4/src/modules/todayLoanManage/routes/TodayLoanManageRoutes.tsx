import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CurrentDayCollectionReport } from '../components/CurrentDayCollectionReport';

const TodayLoanManageRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path={'/todayLoanManage/currentDayCollectionReport'} component={CurrentDayCollectionReport} />
    </Switch>
);

export default TodayLoanManageRoutes;
