import { BusinessRepeatCheck, businessRepeatCheckState, businessRepeatCheckSaga } from './BusinessRepeatCheck';
import { BusinessLastCheck, businessLastCheckState, businessLastCheckSaga } from './BusinessLastCheck';
import { OrderList, orderListState, orderListSaga } from './OrderList';
import { CheckRecord, checkRecordState, checkRecordSaga } from './CheckRecord';
import { BlackListManage, blackListManageSaga, blackListManageState } from './BlackListManage';
import { WhiteListManage, whiteListManageSaga, whiteListManageState } from './WhiteListManage';
import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import {FormattedMessage} from "react-intl";
import React from 'react';

const windControlCheckRoutes = [
    { path: '/businessRepeatCheck', component: BusinessRepeatCheck },
    { path: '/businessLastCheck', component: BusinessLastCheck },
    { path: '/orderList', component: OrderList },
    { path: '/checkRecord', component: CheckRecord },
    { path: '/blackListManage', component: BlackListManage },
    { path: '/whiteListManage', component: WhiteListManage }
]

const windControlCheckMenuList = [
    {
        title: <FormattedMessage id="menu.risk.exam" />,
        key: '/windControlCheck',
        icon: 'export',
        children: [
            {
                title: '订单列表',
                key: '/orderList',
                icon: 'credit-card'
            },
            {
                title: '业务复审',
                key: '/businessRepeatCheck',
                icon: 'check'
            },
            {
                title: '业务终审',
                key: '/businessLastCheck',
                icon: 'tags'
            },
            {
                title: '审核记录',
                key: '/checkRecord',
                icon: 'hdd'
            },
            {
                title: "黑名单",
                key: '/blackListManage',
                icon: 'info-circle-o'
            },
            {
                title: "白名单",
                key: '/whiteListManage',
                icon: 'info-circle-o'
            }
        ]
    }
]

const windControlCheckState = combineReducers({
    businessRepeatCheckState,
    businessLastCheckState,
    orderListState,
    checkRecordState,
    blackListManageState,
    whiteListManageState

})
function* windControlCheckSaga() {
    yield all([
        fork(businessRepeatCheckSaga),
        fork(businessLastCheckSaga),
        fork(orderListSaga),
        fork(checkRecordSaga),
        fork(blackListManageSaga),
        fork(whiteListManageSaga)
    ])
}

export { windControlCheckMenuList, windControlCheckRoutes, windControlCheckSaga, windControlCheckState };