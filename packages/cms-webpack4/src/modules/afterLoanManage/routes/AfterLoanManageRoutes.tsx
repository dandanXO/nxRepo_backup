import React from "react";
import { Route, Switch } from "react-router-dom";
import { PhoneUrgeList } from "../components/PhoneUrgeList";
import { OrderDetail } from "../components/PhoneUrgeList/OrderDetail";

const AfterLoanManageRoutes = () => (
    <Switch>
        <Route exact path={"/afterLoanManage/phoneUrgeList"} component={PhoneUrgeList}/>
        <Route path={"/afterLoanManage/phoneUrgeList/detail/:userId/:orderId"} component={OrderDetail}/>
    </Switch>
)

export default AfterLoanManageRoutes;
