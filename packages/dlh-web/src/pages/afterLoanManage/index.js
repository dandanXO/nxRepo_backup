import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { WaitRepayment, waitRepaymentState, waitRepaymentSaga } from './WaitRepayment';
import { OverdueList, overdueListState, overdueListSaga } from './OverdueList';
import { OverdueOrderDistribute, overdueOrderDistributeState, overdueOrderDistributeSaga } from './OverdueOrderDistribute';
import { OverdueBackRecord, overdueBackRecordState, overdueBackRecordSaga } from './OverdueBackRecord';
import { OverdueReduction, overdueReductionState, overdueReductionSaga } from './OverdueReduction';
// import { OverdueStandOverRecord, overdueStandOverRecordState, overdueStandOverRecordSaga } from './OverdueStandOverRecord';
import { OrderDetail, orderDetailState, orderDetailSaga } from './OrderDetail';
import { PhoneUrgeList, phoneUrgeListState, phoneUrgeListSaga } from './PhoneUrgeList';
import { OverdueDisStatistics1, overdueDisStatistics1State, overdueDisStatistics1Saga } from './OverdueDisStatistics1';
import { OverdueDisStatistics2, overdueDisStatistics2State, overdueDisStatistics2Saga } from './OverdueDisStatistics2';
import { OverdueCollectTeamReport, overdueCollectTeamReportState, overdueCollectTeamReportSaga } from './OverdueCollectTeamReport';



const afterLoanManageRoutes = [
    { path: '/waitRepayment', component: WaitRepayment },
    { path: '/overdueList', component: OverdueList, exact: true },
    { path: '/overdueList/:id/:uid', component: OrderDetail },
    { path: '/overdueOrderDistribute', component: OverdueOrderDistribute },
    { path: '/overdueBackRecord', component: OverdueBackRecord },
    { path: '/phoneUrgeList', component: PhoneUrgeList, exact: true },
    { path: '/phoneUrgeList/:id', component: OrderDetail },
    { path: '/overdueDisStatistics1', component: OverdueDisStatistics1 },
    { path: '/overdueDisStatistics2', component: OverdueDisStatistics2 },
    { path: '/overdue-reduction', component: OverdueReduction },
    { path: '/collect-team-report-overdue', component: OverdueCollectTeamReport },
    // { path: '/overdueStandOverRecord', component: OverdueStandOverRecord },
    // { path: '/overdueStandOverRecord', component: OverdueStandOverRecrd },
];

const afterLoanManageMenuList = [
    {
        title: '催收管理',
        key: '/afterLoanManage',
        icon: 'book',
        children: [
            // {
            //     title: '待还款',
            //     key: '/waitRepayment',
            //     icon: 'user'
            // }
            {
                title: '逾期订单分配',
                key: '/overdueOrderDistribute',
                icon: 'file-add'
            },
            {
                title: '逾期档案',
                key: '/overdueList',
                icon: 'inbox'
            },
            {
                title: '逾期还款记录',
                key: '/overdueBackRecord',
                icon: 'file-text'
            },
            {
                title: '电催列表',
                key: '/phoneUrgeList',
                icon: 'phone'
            },
            {
                title: '逾期催收统计一',
                key: '/overdueDisStatistics1',
                icon: 'file-text'
            },
            {
                title: '逾期催收统计二',
                key: '/overdueDisStatistics2',
                icon: 'file-text'
            },
            {
                title: '逾期减免',
                key: '/overdue-reduction',
                icon: 'save'
            }
            ,
            {
                title: '逾期团队报表',
                key: '/collect-team-report-overdue',
                icon: 'pie-chart'
            }
            // {
            //     title: '逾期展期记录',
            //     key: '/overdueStandOverRecord',
            //     icon: 'database'
            // }
        ]
    }
];
const afterLoanManageState = combineReducers({
    waitRepaymentState,
    overdueOrderDistributeState,
    overdueBackRecordState,
    // overdueStandOverRecordState,
    overdueListState,
    orderDetailState,
    phoneUrgeListState,
    overdueDisStatistics1State,
    overdueDisStatistics2State,
    overdueReductionState,
    overdueCollectTeamReportState
});

function* afterLoanManageSaga() {
    yield all([
        fork(waitRepaymentSaga),
        fork(overdueOrderDistributeSaga),
        fork(overdueListSaga),
        fork(overdueBackRecordSaga),
        fork(phoneUrgeListSaga),
        fork(orderDetailSaga),
        fork(overdueDisStatistics1Saga),
        fork(overdueDisStatistics2Saga),
        fork(overdueReductionSaga),
        fork(overdueCollectTeamReportSaga)
    ])
}
export { afterLoanManageRoutes, afterLoanManageMenuList, afterLoanManageState, afterLoanManageSaga };
