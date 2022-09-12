import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { LOI_GET_TABLE_DATA, loiChangeTableLoading, loiSetTableData } from './actions';
import { getLoaningData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(loiChangeTableLoading(true));
    const res = yield call(getLoaningData, action.params);
    if(res) {
        yield put(loiSetTableData(res));
    }
    yield put(loiChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(LOI_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
