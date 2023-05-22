import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { TodayList, todayListState, todayListSaga } from './TodayList';
import { TodayOrderDistribute, todayOrderDistributeState, todayOrderDistributeSaga } from './TodayOrderDistribute';
import { TodayBackRecord, todayBackRecordState, todayBackRecordSaga } from './TodayBackRecord';
import { TodayOrderDetail, todayOrderDetailState, todayOrderDetailSaga } from './TodayOrderDetail';
import { TodayPhoneUrgeList, todayPhoneUrgeListState, todayPhoneUrgeListSaga } from './TodayPhoneUrgeList';
import { TodayCollectTeamReport, todayCollectTeamReportState, todayCollectTeamReportSaga } from './TodayCollectTeamReport';

const todayLoanManageRoutes = [
    { path: '/todayList', component: TodayList, exact: true },
    { path: '/todayList/:id/:uid', component: TodayOrderDetail },
    { path: '/todayOrderDistribute', component: TodayOrderDistribute },
    { path: '/todayBackRecord', component: TodayBackRecord },
    { path: '/todayPhoneUrgeList', component: TodayPhoneUrgeList, exact: true },
    { path: '/todayPhoneUrgeList/:id/:uid', component: TodayOrderDetail },
    { path: '/collect-team-report-today', component: TodayCollectTeamReport }
];

const todayLoanManageMenuList = [
    {
        title: '当天单据管理',
        key: '/todayLoanManage',
        icon: 'book',
        children: [
            {
                title: '当天单据订单分配',
                key: '/todayOrderDistribute',
                icon: 'file-add'
            },
            {
                title: '当天档案',
                key: '/todayList',
                icon: 'inbox'
            },
            {
                title: '当天还款记录',
                key: '/todayBackRecord',
                icon: 'file-text'
            },
            {
                title: '当天电催列表',
                key: '/todayPhoneUrgeList',
                icon: 'phone'
            }
            ,
            {
                title: '当天团队报表',
                key: '/collect-team-report-today',
                icon: 'pie-chart'
            }
        ]
    }
];
const todayLoanManageState = combineReducers({
    todayOrderDistributeState,
    todayBackRecordState,
    todayListState,
    todayOrderDetailState,
    todayPhoneUrgeListState,
    todayCollectTeamReportState
});

function* todayLoanManageSaga() {
    yield all([
        fork(todayOrderDistributeSaga),
        fork(todayListSaga),
        fork(todayBackRecordSaga),
        fork(todayPhoneUrgeListSaga),
        fork(todayOrderDetailSaga),
        fork(todayCollectTeamReportSaga)
    ])
}
export { todayLoanManageRoutes, todayLoanManageMenuList, todayLoanManageState, todayLoanManageSaga };
