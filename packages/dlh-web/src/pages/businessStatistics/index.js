import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { LoanRecycleStatistics, loanRecycleStatisticsState, loanRecycleStatisticsSaga } from './LoanRecycleStatistics';
import { TdRefuseStatistics, tdRefuseStatisticsState, tdRefuseStatisticsSaga } from './TdRefuseStatistics';
import { AllDataStatistics, allDataStatisticsState, allDataStatisticsSaga } from './AllDataStatistics';
import { OverdueStatistics, overdueStatisticsState, overdueStatisticsSaga } from './OverdueStatistics';
import { OverdueStatistics2, overdueStatistics2State, overdueStatistics2Saga  } from './OverdueStatistics2';
import { NewOverdueStatistics, newOverdueStatisticsSaga, newOverdueStatisticsState } from './NewOverdueStatistics';
import { AutoDeductionsStatistics,  autoDeductionsStatisticsSaga, autoDeductionsStatisticsState } from './AutoDeductionsStatistics';
import { AtoSStatistics, atosStatisticsState, atosStatisticsSaga } from './AtoSStatistics';
import { SumStatistics, sumStatisticsState, sumStatisticsSaga } from './SumStatistics';
import { Registrations, registrationsState,registrationsSaga } from './Registrations';
import { TodayStatistics, todayStatisticsState, todayStatisticsSaga } from './TodayStatistics';
import { OrderStatistics, orderStatisticsState, orderStatisticsSaga } from './OrderStatistics';
import { UVStatistics, UVStatisticsState, UVStatisticsSaga } from './UVStatistics';
import { ChannelUserUVStatistics, channelUserUVStatisticsState, channelUserUVStatisticsSaga } from './ChannelUserUVStatistics';
import { FinancialStatistics, } from './FinancialStatistics';

const businessStatisticsRoutes  = [
    { path: '/loanRecycleStatistics', component: LoanRecycleStatistics },
    { path: '/tdRefuseStatistics', component: TdRefuseStatistics },
    { path: '/allDataStatistics', component: AllDataStatistics },
    { path: '/overdueStatistics', component: OverdueStatistics },
    { path: '/overdueStatistics2', component: OverdueStatistics2 },
    { path: '/newOverdueStatistics', component: NewOverdueStatistics },
    { path: '/autoDeductionsStatistics', component: AutoDeductionsStatistics },
    { path: '/atoSStatistics', component: AtoSStatistics },
    { path: '/SumStatistics', component: SumStatistics },
    { path: '/Registrations', component: Registrations },
    { path: '/todayStatistics', component: TodayStatistics },
    { path: '/orderStatistics', component: OrderStatistics },
    { path: '/uvStatistics', component: UVStatistics },
    { path: '/channelUserUVStatistics', component: ChannelUserUVStatistics },
    { path: '/financial-report', component: FinancialStatistics },
]

const businessStatisticsMenuList = [
    {
        title: '业务统计',
        key: '/businessStatistics',
        icon: 'code-o',
        children: [
            {
                title: '回款统计',
                key: '/loanRecycleStatistics',
                icon: 'dot-chart'
            },
            {
                title: '回款统计二',
                key: '/newOverdueStatistics',
                icon: 'hourglass'
            },
            {
                title: '代扣统计',
                key: '/autoDeductionsStatistics',
                icon: 'dot-chart'
            },
            {
                title: '被拒原因统计',
                key: '/tdRefuseStatistics',
                icon: 'question-circle-o'
            },
            {
                title: '各项指标汇总',
                key: '/allDataStatistics',
                icon: 'line-chart'
            },
            {
                title: '逾期统计',
                key: '/overdueStatistics',
                icon: 'hourglass'
            },
            {
                title: '逾期统计二',
                key: '/overdueStatistics2',
                icon: 'hourglass'
            },
            {
                title: 'AtoS统计',
                key: '/atoSStatistics',
                icon: 'hourglass'
            },
            {
                title: '汇总统计',
                key: '/SumStatistics',
                icon: 'hourglass'
            },
            {
                title: '新客日统计转化率',
                key: '/Registrations',
                icon: 'hourglass'
            },
            {
                title: '当日订单统计',
                key: '/todayStatistics',
                icon: 'hourglass'
            },
            {
                title: '订单统计报表',
                key: '/orderStatistics',
                icon: 'hourglass'
            },
            {
                title: '渠道访客纪录统计',
                key: '/uvStatistics',
                icon: 'hourglass'
            },
            {
                title: '渠道用户来源UV统计',
                key: '/channelUserUVStatistics',
                icon: 'hourglass'
            },
            {
                title: '财务报表',
                key: '/financialStatistics',
                icon: 'hourglass'
            }      
        ]
    }
];
const businessStatisticsState = combineReducers({
    loanRecycleStatisticsState,
    tdRefuseStatisticsState,
    allDataStatisticsState,
    overdueStatisticsState,
    overdueStatistics2State,
    newOverdueStatisticsState,
    autoDeductionsStatisticsState,
    atosStatisticsState,
    sumStatisticsState,
    registrationsState,
    todayStatisticsState,
    orderStatisticsState,
    UVStatisticsState,
    channelUserUVStatisticsState,
});

function* businessStatisticsSaga() {
    yield all([
        fork(loanRecycleStatisticsSaga),
        fork(tdRefuseStatisticsSaga),
        fork(allDataStatisticsSaga),
        fork(overdueStatisticsSaga),
        fork(overdueStatistics2Saga),
        fork(newOverdueStatisticsSaga),
        fork(autoDeductionsStatisticsSaga),
        fork(atosStatisticsSaga),
        fork(sumStatisticsSaga),
        fork(registrationsSaga),
        fork(todayStatisticsSaga),
        fork(orderStatisticsSaga),
        fork(UVStatisticsSaga),
        fork(channelUserUVStatisticsSaga),
    ])
}

export { businessStatisticsMenuList, businessStatisticsRoutes, businessStatisticsSaga, businessStatisticsState };