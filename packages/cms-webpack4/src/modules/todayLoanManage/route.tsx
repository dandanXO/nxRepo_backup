import React from 'react';

const route = {
    // 當日催收
    path: '/todayLoanManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 當日催收列表
            path: '/todayPhoneUrgeList',
            component: React.lazy(
                () => import(/* webpackChunkName: "TodayLoanPhoneUrgeList" */ './components/TodayPhoneUrgeList'),
            ),
            exact: true,
        },
        {
            // 當日催收列表-订单详情
            path: '/todayPhoneUrgeList/detail/:userId/:collectId',
            component: React.lazy(
                () => import(/* webpackChunkName: "TodayLoanPhoneUrgeListDetail" */ './components/OrderDetail'),
            ),
        },
        {
            // 当日订单分配
            path: '/todayOrderDistribute',
            component: React.lazy(
                () =>
                    import(
                        /* webpackChunkName: "TodayLoanOrderDistribute" */ '../distribution/pages/TodayDistributionPage'
                    ),
            ),
        },
        {
            // 當日催收明細
            path: '/collect-detail',
            component: React.lazy(
                () =>
                    import(/* webpackChunkName: "TodayLoanCollectDetail" */ './components/CurrentDayCollectionReport'),
            ),
        },
    ],
};

export default route;
