import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { loginSaga, loginState } from '../pages/login';
import { userManageSaga, userManageState } from '../pages/userManage';
import { channelManageSaga, channelManageState } from '../pages/channelManage';
import { paramsManageSaga, paramsManageState } from '../pages/paramsManage';
import { loanManageSaga, loanManageState } from '../pages/loanManage';
import { afterLoanManageSaga, afterLoanManageState } from '../pages/afterLoanManage';
import { systemManageSaga, systemManageState } from '../pages/systemManage';
import { systemPeopleManageSaga, systemPeopleManageState } from '../pages/systemManage/CollectTeamManage/PeopleManage';
import { windControlCheckSaga, windControlCheckState } from '../pages/windControlCheck';
import { h5ManageSaga, h5ManageState } from '../pages/h5Manage';
import { businessStatisticsSaga, businessStatisticsState } from '../pages/businessStatistics';
import { operatorManageSaga, operatorManageState } from '../pages/operatorManage';
import { indexStatisticsAllSaga, indexStatisticsAllState } from '../pages/indexStatistics';
import { paymentManageState, paymentManageSaga } from '../pages/paymentManage';
import { riskFeeManageState, riskFeeManageSaga } from '../pages/riskFeeManage';
import { todayLoanManageSaga, todayLoanManageState } from '../pages/todayLoanManage';
import { payAndSettleManageSaga, payAndSettleManageState } from '../pages/payAndSettleManage';
import { extensionPeriodLoanManageSaga, extensionPeriodLoanManageState } from '../pages/extensionPeriodLoanManage';
import { globalSettingState } from "../layouts/LayoutHeader";
import { telSaleManageState, telSaleManageSaga } from '../pages/telSaleManage';
const rootState = combineReducers({
    userManageState,
    channelManageState,
    paramsManageState,
    loanManageState,
    afterLoanManageState,
    loginState,
    systemManageState,
    systemPeopleManageState,
    windControlCheckState,
    h5ManageState,
    businessStatisticsState,
    operatorManageState,
    indexStatisticsAllState,
    paymentManageState,
    riskFeeManageState,
    todayLoanManageState,
    payAndSettleManageState,
    extensionPeriodLoanManageState,
    globalSettingState,
    telSaleManageState,

})

function* rootSaga () {
    yield all([
        fork(userManageSaga),
        fork(channelManageSaga),
        fork(paramsManageSaga),
        fork(loanManageSaga),
        fork(afterLoanManageSaga),
        fork(loginSaga),
        fork(systemManageSaga),
        fork(systemPeopleManageSaga),
        fork(windControlCheckSaga),
        fork(h5ManageSaga),
        fork(businessStatisticsSaga),
        fork(operatorManageSaga),
        fork(indexStatisticsAllSaga),
        fork(paymentManageSaga),
        fork(riskFeeManageSaga),
        fork(todayLoanManageSaga),
        fork(payAndSettleManageSaga),
        fork(extensionPeriodLoanManageSaga),
        fork(telSaleManageSaga)
    ])
}
export { rootState, rootSaga }
