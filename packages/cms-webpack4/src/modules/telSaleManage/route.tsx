import React from 'react';

import { Route } from '../../routes';

const route: Route = {
    path: '/telSaleManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            path: '/telSaleMemberManage',
            component: React.lazy(
                () => import(/* webpackChunkName: "TelSaleMemberManage" */ './components/TelSaleMemberManage'),
            ),
        },
    ],
};

export default route;
