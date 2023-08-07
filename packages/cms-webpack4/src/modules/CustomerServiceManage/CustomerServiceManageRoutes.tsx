import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Feedback } from "./components/Feedback";


const CustomerServiceManageRoutes = (): JSX.Element => (
    <Switch>
        <Route path={'/customer-service-manage/feedback'} component={Feedback} />
    </Switch>
);

export default CustomerServiceManageRoutes;
