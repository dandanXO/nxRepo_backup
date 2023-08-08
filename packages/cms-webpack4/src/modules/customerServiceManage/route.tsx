import React from 'react';

const route = {
    // 客服管理
    path: '/customer-service-manage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 客服管理
            path: '/feedback',
            component: React.lazy(
                () => import(/* webpackChunkName: "CustomerServiceManage" */ './components/Feedback'),
            ),
        },
    ],
};

export default route;
