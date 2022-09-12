import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { CG_GET_TABLE_DATA, cGChangeTableLoading, cGSetTableData } from './actions';
import { getChannelGatherData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(cGChangeTableLoading(true));
    const res = yield call(getChannelGatherData, action.params);
    if(res) {
        yield put(cGSetTableData(res));
    }
    yield put(cGChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CG_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
