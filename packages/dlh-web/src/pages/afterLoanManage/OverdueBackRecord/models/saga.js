import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { OBR_GET_TABLE_DATA, obrChangeTableLoading, obrSetTableData, OBR_GET_PAYMENT_DATA, obrSetPaymentData } from './actions';
import { getOverdueList, getPaymentList } from '../api';

function* getTableData(action) {
    yield put(obrChangeTableLoading(true));
    try{
        const res = yield call(getOverdueList, action.params);
        if(Number(res.code) === 200) {
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(obrSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(obrChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OBR_GET_TABLE_DATA, getTableData);
}

function* getPaymentListData(action) {
    try{
        const res = yield call(getPaymentList, action.params);
        yield put(obrSetPaymentData(res));
    } catch (e) {
    }
}

function* watchGetPaymentListData() {
    yield takeEvery(OBR_GET_PAYMENT_DATA, getPaymentListData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPaymentListData)
    ])
}
