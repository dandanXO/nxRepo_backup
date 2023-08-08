import React from 'react';

const route = {
    // 用戶管理
    path: '/userManage',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 用戶管理
            path: '/userInfoManage',
            component: React.lazy(() => import(/* webpackChunkName: "UserInfo" */ './components/UserPage')),
            exact: true,
        },
        {
            // 用戶管理-用户详细信息
            path: '/userInfoManage/detail/:userId',
            component: React.lazy(() => import(/* webpackChunkName: "UserInfoDetail" */ './components/UserInfoPage')),
        },
        {
            // 用戶終審
            path: '/userLastCheck',
            component: React.lazy(() => import(/* webpackChunkName: "UserLastCheck" */ './components/UserReviewPage')),
            exact: true,
        },
        {
            // 用戶終審-审核
            path: '/userLastCheck/review/:userId',
            component: React.lazy(
                () => import(/* webpackChunkName: "UserLastCheckReview" */ './components/UserReviewInfoPage'),
            ),
        },
        {
            // 用戶審核紀錄
            path: '/userCheckRecord',
            component: React.lazy(
                () => import(/* webpackChunkName: "UserCheckRecord" */ './components/UserReviewRecordPage'),
            ),
        },
        {
            // 黑名單
            path: '/blackListManage',
            component: React.lazy(
                () => import(/* webpackChunkName: "UserBlackListManage" */ './components/BlackListPage'),
            ),
        },
        {
            // 白名單
            path: '/whiteListManage',
            component: React.lazy(
                () => import(/* webpackChunkName: "UserWhiteListManage" */ './components/WhiteListPage'),
            ),
        },
    ],
};

export default route;
