import React from 'react';

const route = {
    // 渠道管理
    path: '/channelManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 逾期催收列表
            path: '/channelList',
            component: React.lazy(() => import(/* webpackChunkName: "ChannelList" */ './components/ChannelTabPage')),
        },
    ],
};

export default route;
