import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { DL_GET_TABLE_DATA, dlChangeTableLoading, dlSetTableData } from './actions';
import { getDeviceListData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(dlChangeTableLoading(true));
    const res = yield call(getDeviceListData, action.params);
    if(res) {
        yield put(dlSetTableData(res));
    }
    yield put(dlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(DL_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
