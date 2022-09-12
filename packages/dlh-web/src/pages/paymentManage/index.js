import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { LoanRecord, loanRecordState, loanRecordSaga } from './LoanRecord';
import { RefundRecord, refundRecordState, refundRecordSaga } from './RefundRecord';
import { AddRefund, addRefundState, addRefundSaga } from './AddRefund';
import { RepeatLoan, repeatLoanState, repeatLoanSaga, DetailModal } from './RepeatLoan';
import { OnlineRefund, olAddRefundState, olAddRefundSaga } from './OnlineRefund';
import { OnlineReliefRecord, olRefundRecordState, olRefundRecordSaga } from './OnlineReliefRecord';
import { OverOrderHandle, overOrderHandleState, overOrderHandleSaga } from './OverOrderHandle';
import { OverOrderHandleRecord, overOrderHandleRecordState, overOrderHandleRecordSaga } from './OverOrderHandleRecord';

const paymentManageRoutes = [
    { path: '/loanRecord', component: LoanRecord },
    { path: '/refundRecord', component: RefundRecord },
    { path: '/addRefund', component: AddRefund },
    { path: '/repeatLoan', component: RepeatLoan },
    { path: '/onlineRefund', component: OnlineRefund },
    { path: '/onlineReliefRecord', component: OnlineReliefRecord },
    { path: '/overOrderHandle', component: OverOrderHandle },
    { path: '/overOrderHandleRecord', component: OverOrderHandleRecord }
];

const paymentMangeMenuList = [
    {
        title: '支付管理',
        key: '/paymentManage',
        icon: 'pay-circle-o',
        children: [
            {
                title: '放款记录',
                key: '/loanRecord',
                icon: 'pay-circle'
            },
            {
                title: '还款记录',
                key: '/refundRecord',
                icon: 'save'
            },
            {
                title: '线下还款',
                key: '/addRefund',
                icon: 'plus-circle'
            },
            {
                title: '线上还款',
                key: '/onlineRefund',
                icon: 'plus-circle'
            },
            {
                title: '减免列表',
                key: '/OnlineReliefRecord',
                icon: 'save'
            },
            {
                title: '重新放款',
                key: '/repeatLoan',
                icon: 'pay-circle'
            },
            {
                title: '错单维护',
                key: '/overOrderHandle',
                icon: 'pay-circle'
            },
            {
                title: '错单历史',
                key: '/overOrderHandleRecord',
                icon: 'pay-circle'
            }
        ]
    }
];

const paymentManageState = combineReducers({
    loanRecordState,
    refundRecordState,
    addRefundState,
    repeatLoanState,
    olAddRefundState,
    olRefundRecordState,
    overOrderHandleState,
    overOrderHandleRecordState
});

function* paymentManageSaga() {
    yield all([
        fork(loanRecordSaga),
        fork(refundRecordSaga),
        fork(addRefundSaga),
        fork(repeatLoanSaga),
        fork(olAddRefundSaga),
        fork(olRefundRecordSaga),
        fork(overOrderHandleSaga),
        fork(overOrderHandleRecordSaga)
    ]);
}

export { paymentManageRoutes, paymentManageSaga, paymentManageState, paymentMangeMenuList, DetailModal };