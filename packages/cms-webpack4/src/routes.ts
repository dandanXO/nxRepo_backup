import React from 'react';

import afterLoanManageRoute from './modules/afterLoanManage/route';
import appManageRoute from './modules/app/route';
import channelManageRoute from './modules/channel/route';
import customerServiceManageRoute from './modules/customerServiceManage/route';
import diversionManageRoute from './modules/diversion/route';
import financialRoute from './modules/financial/route';
import orderManageRoute from './modules/order/route';
import productManageRoute from './modules/product/route';
import riskManageRoute from './modules/risk/route';
import statisticsRoute from './modules/statistics/route';
import systemManageRoute from './modules/system/route';
import telSaleManageRoute from './modules/telSaleManage/route';
import todayLoanManageRoute from './modules/todayLoanManage/route';
import userManageRoute from './modules/user/route';

export type Route = {
    path: string;
    component: React.LazyExoticComponent<any>;
    routes: {
        path: string;
        component: React.LazyExoticComponent<any>;
        exact?: boolean;
    }[];
};

export default [
    userManageRoute,
    productManageRoute,
    orderManageRoute,
    financialRoute,
    diversionManageRoute,
    todayLoanManageRoute,
    afterLoanManageRoute,
    statisticsRoute,
    channelManageRoute,
    riskManageRoute,
    systemManageRoute,
    appManageRoute,
    customerServiceManageRoute,
    telSaleManageRoute,
];
