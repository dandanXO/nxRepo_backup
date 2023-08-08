import React from 'react';

const route = {
    // App配置
    path: '/appSetting',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // App配置
            path: '/appSettingManage',
            component: React.lazy(() => import(/* webpackChunkName: "AppAppSetting" */ './components/AppManagePage')),
        },
    ],
};

export default route;
