import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { AMG_GET_TABLE_DATA, amgChangeTableLoading, amgSetTableData } from './actions';
import { getAdminManageData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(amgChangeTableLoading(true));
    const res = yield call(getAdminManageData, action.params);
    if(res) {
        yield put(amgSetTableData(res));
    }
    yield put(amgChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(AMG_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
