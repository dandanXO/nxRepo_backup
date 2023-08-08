import React from 'react';

const route = {
    // 產品管理
    path: '/platform-manage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 商戶管理
            path: '/merchant-manage',
            component: React.lazy(() => import(/* webpackChunkName: "ProductMerchant" */ './components/MerchantPage')),
        },
        {
            // 產品管理
            path: '/product-manage',
            component: React.lazy(() => import(/* webpackChunkName: "ProductProduct" */ './components/ProductPage')),
        },
    ],
};

export default route;
