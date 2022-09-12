import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { RiskFeeListManage, riskFeeListManageSaga, riskFeeListManageState } from './RiskFeeListManage';
import { RiskFeeDepositManage, riskFeeDepositManageSaga, riskFeeDepositManageState } from './RiskFeeDepositManage';
const riskFeeManageRoutes = [
    { path: '/riskFeeListManage', component: RiskFeeListManage },
    { path: '/riskFeeDepositManage', component: RiskFeeDepositManage }
]

const riskFeeManageMenuList = [
    {
        title: '风控管理',
        key: '/riskFeeManage',
        icon: 'export',
        children: [
            {
                title: '风控记录',
                key: '/riskFeeListManage',
                icon: 'tags'
            },
            {
                title: '风控费用充值',
                key: '/riskFeeDepositManage',
                icon: 'tags'
            }
        ]
    }
]

const riskFeeManageState = combineReducers({
    riskFeeListManageState,
    riskFeeDepositManageState
})
function* riskFeeManageSaga() {
    yield all([
        fork(riskFeeListManageSaga),
        fork(riskFeeDepositManageSaga)
    ])
}

export { riskFeeManageMenuList, riskFeeManageRoutes, riskFeeManageSaga, riskFeeManageState };