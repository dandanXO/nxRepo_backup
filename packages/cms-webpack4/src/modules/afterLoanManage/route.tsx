import React from 'react';

const route = {
    // 逾期催收
    path: '/afterLoanManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 逾期催收列表
            path: '/phoneUrgeList',
            component: React.lazy(
                () => import(/* webpackChunkName: "AfterLoanPhoneUrgeList" */ './components/PhoneUrgeList'),
            ),
            exact: true,
        },
        {
            // 逾期催收列表-订单详情
            path: '/phoneUrgeList/detail/:userId/:collectId',
            component: React.lazy(
                () => import(/* webpackChunkName: "AfterLoanPhoneUrgeListDetail" */ './components/OrderDetail'),
            ),
        },
        {
            // 逾期订单分配
            path: '/overdueOrderDistribute',
            component: React.lazy(
                () =>
                    import(
                        /* webpackChunkName: "AfterLoanOrderDistribute" */ '../distribution/pages/OverdueDistributionPage'
                    ),
            ),
        },
        {
            // 逾期催收明細
            path: '/collect-detail',
            component: React.lazy(
                () => import(/* webpackChunkName: "AfterLoanCollectDetail" */ './components/OverDueCollectionReport'),
            ),
        },
    ],
};

export default route;
