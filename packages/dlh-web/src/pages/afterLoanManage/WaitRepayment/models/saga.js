import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { WRM_GET_TABLE_DATA, wrmChangeTableLoading, wrmSetTableData } from './actions';
import { getWaitRepaymentData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(wrmChangeTableLoading(true));
    const res = yield call(getWaitRepaymentData, action.params);
    if(res) {
        yield put(wrmSetTableData(res));
    }
    yield put(wrmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WRM_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
