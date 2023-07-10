import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { OrderDetail } from '../components/OrderDetail';
import { TodayPhoneUrgeList } from '../components/TodayPhoneUrgeList';
import { CurrentDayCollectionReport } from '../components/CurrentDayCollectionReport';

const TodayLoanManageRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path={'/todayLoanManage/todayPhoneUrgeList'} component={TodayPhoneUrgeList} />
        <Route path={'/todayLoanManage/todayPhoneUrgeList/detail/:userId/:collectId'} component={OrderDetail} />
        <Route exact path={'/todayLoanManage/currentDayCollectionReport'} component={CurrentDayCollectionReport} />
    </Switch>
);

export default TodayLoanManageRoutes;
