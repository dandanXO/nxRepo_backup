import React from 'react';

const route = {
    // 財務管理
    path: '/paymentManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 還款補單
            path: '/pay-receipt',
            component: React.lazy(
                () => import(/* webpackChunkName: "PaymentPayReceipt" */ './components/PayReceiptPage'),
            ),
        },
    ],
};

export default route;
