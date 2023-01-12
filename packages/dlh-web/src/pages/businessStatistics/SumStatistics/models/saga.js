
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { SUM_GET_TABLE_DATA, sumChangeTableLoading, sumSetTableData } from './actions';
import { tableList } from '../api';

function* getTableData(action) {
    yield put(sumChangeTableLoading(true));
    try {
        const res = yield call(tableList, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(sumSetTableData(data))
        }
    } catch (e) {

    }
    yield put(sumChangeTableLoading(false));
}
function* watchGetTableData() {
    yield takeEvery(SUM_GET_TABLE_DATA, getTableData)
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ]);
}
