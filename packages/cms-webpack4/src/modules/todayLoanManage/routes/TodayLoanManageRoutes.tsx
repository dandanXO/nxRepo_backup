import React from "react";
import { Route, Switch } from "react-router-dom";
import { TodayPhoneUrgeList } from "../components/TodayPhoneUrgeList";
import { OrderDetail } from "../components/OrderDetail";

const TodayLoanManageRoutes = () => (
    <Switch>
        <Route exact path={"/todayLoanManage/todayPhoneUrgeList"} component={TodayPhoneUrgeList}/>
        <Route path={"/todayLoanManage/todayPhoneUrgeList/detail/:userId/:collectId"} component={OrderDetail}/>
    </Switch>
)

export default TodayLoanManageRoutes;
