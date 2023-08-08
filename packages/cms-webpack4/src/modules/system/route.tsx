import React from 'react';

const route = {
    // 系統管理
    path: '/systemManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 參數配置
            path: '/configManage',
            component: React.lazy(
                () => import(/* webpackChunkName: "SystemConfigManage" */ './components/ConfigManagePage'),
            ),
        },
        {
            // 登入帐号管理
            path: '/loginAccountMange',
            component: React.lazy(
                () => import(/* webpackChunkName: "SystemLoginAccountManage" */ './components/LoginAccountManage'),
            ),
        },
    ],
};

export default route;
