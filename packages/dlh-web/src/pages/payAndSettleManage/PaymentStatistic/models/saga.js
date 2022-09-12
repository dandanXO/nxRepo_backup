import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_GET_STATISTIC_TABLE_DATA,
    paySetTableData,
    payChangeTableLoading
} from './actions';
import { getPaymentStatisticList } from '../api';

function* getTableData (action) {
    console.log('action',action)
    yield put(payChangeTableLoading(true));
    try {
        const res = yield call(getPaymentStatisticList, action.params);
        yield put(paySetTableData(res.paymentStatisticList));
    } catch (e) {

    }

    yield put(payChangeTableLoading(false));
}

function* watchGetTableData () {
    yield takeEvery(PAY_GET_STATISTIC_TABLE_DATA, getTableData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
    ])
}
