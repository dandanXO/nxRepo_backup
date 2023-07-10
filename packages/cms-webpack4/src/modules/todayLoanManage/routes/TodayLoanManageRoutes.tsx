import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CurrentDayCollectionReport } from '../components/CurrentDayCollectionReport';
import { OrderDetail } from '../components/OrderDetail';
import { TodayPhoneUrgeList } from '../components/TodayPhoneUrgeList';

const TodayLoanManageRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path={'/todayLoanManage/todayPhoneUrgeList'} component={TodayPhoneUrgeList} />
        <Route path={'/todayLoanManage/todayPhoneUrgeList/detail/:userId/:collectId'} component={OrderDetail} />
        <Route exact path={'/todayLoanManage/currentDayCollectionReport'} component={CurrentDayCollectionReport} />
    </Switch>
);

export default TodayLoanManageRoutes;
