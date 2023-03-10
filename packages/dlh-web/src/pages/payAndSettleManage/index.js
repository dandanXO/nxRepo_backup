import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { payTypeList, payTypeListState, payTypeListSaga } from './payTypeManage';
import { payPlatList, payPlatListState, payPlatListSaga } from './payPlatList';
import { payMchList, payMchListState, payMchListSaga } from './payMchManage';
import { payOrderList, payOrderListState, payOrderListSaga } from './payOrderManage';
import { settlePlatList, settlePlatListState, settlePlatListSaga } from './settlePlatList';
import { settleMchList, settleMchListState, settleMchListSaga } from './settleMchManage';
import { settleOrderList, settleOrderListState, settleOrderListSaga } from './settleOrderManage';
import { payCommBankList, payCommBankListState, payCommBankListSaga } from './commonBankManage';
import { assetDetailList, assetDetailListState, assetDetailListSaga } from './assetDetailManage';
import { payManualOrderList, payManualOrderListState, payManualOrderListSaga } from './payManualOrderManage';
import { settleManualOrderList, settleManualOrderListState, settleManualOrderListSaga } from './settleManualOrderManage';
import { PaymentStatistic, paymentStatisticState, paymentStatisticSaga } from './PaymentStatistic';


const payAndSettleManageRoutes = [
    { path: '/payTypeList', component: payTypeList },
    { path: '/payPlatList', component: payPlatList },
    { path: '/payMchList', component: payMchList },
    { path: '/payOrderList', component: payOrderList },
    { path: '/settlePlatList', component: settlePlatList },
    { path: '/settleMchList', component: settleMchList },
    { path: '/settleOrderList', component: settleOrderList },
    { path: '/payCommBankList', component: payCommBankList },
    { path: '/assetDetailList', component: assetDetailList },
    { path: '/payManualOrderList', component: payManualOrderList },
    { path: '/settleManualOrderList', component: settleManualOrderList },
    { path: '/paymentStatistic', component: PaymentStatistic },
];

const payAndSettleManageMenuList = [
    {
        title: '代收代付订单',
        key: '/payAndSettleManage',
        icon: 'pay-circle-o',
        children: [
            {
                title: '代收方式列表',
                key: '/payTypeList',
                icon: 'pay-circle'
            },
            {
                title: '代收平台列表',
                key: '/payPlatList',
                icon: 'file-text'
            },
            {
                title: '代收商户列表',
                key: '/payMchList',
                icon: 'save'
            },
            {
                title: '代收订单列表',
                key: '/payOrderList',
                icon: 'file-circle'
            },
            {
                title: '代付平台列表',
                key: '/settlePlatList',
                icon: 'file-circle'
            },
            {
                title: '代付商户列表',
                key: '/settleMchList',
                icon: 'file-circle'
            },
            {
                title: '代付订单列表',
                key: '/settleOrderList',
                icon: 'file-circle'
            },
            {
                title: '银行卡BIN列表',
                key: '/payCommBankList',
                icon: 'file-circle'
            },
            {
                title: '资金流明细列表',
                key: '/assetDetailList',
                icon: 'file-circle'
            },
            {
                title: '手动代收订单列表',
                key: '/payManualOrderList',
                icon: 'file-circle'
            },
            {
                title: '手动代付订单列表',
                key: '/settleManualOrderList',
                icon: 'file-circle'
            },
            {
                title: '代收代付统计',
                key: '/paymentStatistic',
                icon: 'file-circle'
            },
        ]
    }
];

const payAndSettleManageState = combineReducers({
    payTypeListState,
    payPlatListState,
    payMchListState,
    payOrderListState,
    settlePlatListState,
    settleMchListState,
    settleOrderListState,
    payCommBankListState,
    assetDetailListState,
    payManualOrderListState,
    settleManualOrderListState,
    paymentStatisticState
});

function* payAndSettleManageSaga() {
    yield all([
        fork(payTypeListSaga),
        fork(payPlatListSaga),
        fork(payMchListSaga),
        fork(payOrderListSaga),
        fork(settlePlatListSaga),
        fork(settleMchListSaga),
        fork(settleOrderListSaga),
        fork(payCommBankListSaga),
        fork(assetDetailListSaga),
        fork(payManualOrderListSaga),
        fork(settleManualOrderListSaga),
        fork(paymentStatisticSaga),
    ]);
}

export { payAndSettleManageRoutes, payAndSettleManageSaga, payAndSettleManageState, payAndSettleManageMenuList };