import React from 'react';

const route = {
    // 导流管理
    path: '/h5Manage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 活动广告管理
            path: '/activity-setting',
            component: React.lazy(
                () => import(/* webpackChunkName: "H5ActivitySetting" */ './components/ActivityAdsPage'),
            ),
        },
    ],
};

export default route;
