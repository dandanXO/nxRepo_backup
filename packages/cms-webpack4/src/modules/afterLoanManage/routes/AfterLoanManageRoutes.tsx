import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { OrderDetail } from '../components/OrderDetail';
import { PhoneUrgeList } from '../components/PhoneUrgeList';

const AfterLoanManageRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path={'/afterLoanManage/phoneUrgeList'} component={PhoneUrgeList} />
        <Route path={'/afterLoanManage/phoneUrgeList/detail/:userId/:collectId'} component={OrderDetail} />
    </Switch>
);

export default AfterLoanManageRoutes;