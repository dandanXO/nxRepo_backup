import React from 'react';

const route = {
    // 数据统计
    path: '/businessStatistics',
    component: React.lazy(() => import(/* webpackChunkName: "NestedRoute" */ '../shared/components/NestedRoute')),
    routes: [
        {
            // 新客日统计转化率
            path: '/Registrations',
            component: React.lazy(
                () =>
                    import(
                        /* webpackChunkName: "StatisticRegistrations" */ './components/NewCustomersDailyConversionRatesPage'
                    ),
            ),
        },
        {
            // 用户复借统计
            path: '/reloanStatistics',
            component: React.lazy(
                () => import(/* webpackChunkName: "StatisticReLoanStatistic" */ './components/ReloanStatisticsPage'),
            ),
        },
        {
            // 新客风控回款率
            path: '/newCustomerRiskPaymentRate',
            component: React.lazy(
                () =>
                    import(
                        /* webpackChunkName: "StatisticNewCustomerRiskPaymentRate" */ './components/NewCustomerRiskControlRepaymentRatePage'
                    ),
            ),
        },
        {
            // 每日用户风控标签统计
            path: '/riskControlStatistic',
            component: React.lazy(
                () =>
                    import(/* webpackChunkName: "StatisticRiskControlStatistic" */ './components/DailyRiskControlPage'),
            ),
        },
    ],
};

export default route;
