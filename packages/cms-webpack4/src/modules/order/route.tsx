import React from 'react';

const route = {
    // 訂單管理
    path: '/orderManagement',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 订单审核纪录
            path: '/checkRecord',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderCheckRecord" */ './components/OrderReviewRecordPage'),
            ),
        },
        {
            // 訂單列表
            path: '/orderList',
            component: React.lazy(() => import(/* webpackChunkName: "OrderList" */ './components/OrderPage')),
            exact: true,
        },
        {
            // 訂單列表-订单详情
            path: '/orderList/detail/:userId/:orderId/:orderNo',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderListDetail" */ './components/OrderDetailPage'),
            ),
        },
        {
            // 订单复审
            path: '/businessRepeatCheck',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderRepeatCheck" */ './components/OrderReviewPage'),
            ),
            exact: true,
        },
        {
            // 订单复审-审核
            path: '/businessRepeatCheck/review/:userId/:orderId/:orderNo',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderRepeatCheckReview" */ './components/OrderReviewDetailPage'),
            ),
        },
        {
            // 訂單終審
            path: '/businessLastCheck',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderLastCheck" */ './components/OrderFinalReviewPage'),
            ),
            exact: true,
        },
        {
            // 訂單終審-审核
            path: '/businessLastCheck/review/:userId/:orderId/:orderNo',
            component: React.lazy(
                () => import(/* webpackChunkName: "OrderLastCheckDetail" */ './components/OrderFinalReviewDetailPage'),
            ),
        },
    ],
};

export default route;
