import React from 'react';

const route = {
    // 风控管理
    path: '/riskConfigManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 风控配置
            path: '/risk-model-setting',
            component: React.lazy(
                () => import(/* webpackChunkName: "RiskConfigRisKModelSetting" */ './components/RiskSettingPage'),
            ),
        },
    ],
};

export default route;
