import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ManualLoanExtend, mLoanExtendState, mLoanExtendSaga } from './ManualLoanExtend';
import { ExtensionPeriodRecord, epRecordState, epRecordSaga } from './ExtensionPeriodRecord';

const extensionPeriodLoanManageRoutes = [
    { path: '/manualLoanExtend', component: ManualLoanExtend },
    { path: '/extensionPeriodRecord', component: ExtensionPeriodRecord }
];

const extensionPeriodLoanMangeMenuList = [
    {
        title: '展期管理',
        key: '/extensionPeriodLoanManage',
        icon: 'pay-circle-o',
        children: [
            {
                title: '手动展期',
                key: '/manualLoanExtend',
                icon: 'plus-circle'
            },
            {
                title: '展期记录',
                key: '/extensionPeriodRecord',
                icon: 'plus-circle'
            }
        ]
    }
];

const extensionPeriodLoanManageState = combineReducers({
    mLoanExtendState,
    epRecordState
});

function* extensionPeriodLoanManageSaga() {
    yield all([
        fork(mLoanExtendSaga),
        fork(epRecordSaga)
    ]);
}

export { extensionPeriodLoanManageRoutes, extensionPeriodLoanManageSaga, extensionPeriodLoanManageState, extensionPeriodLoanMangeMenuList };