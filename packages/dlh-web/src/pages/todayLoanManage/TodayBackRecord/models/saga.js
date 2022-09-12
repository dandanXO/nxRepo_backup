import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { TOBR_GET_TABLE_DATA, tobrChangeTableLoading, tobrSetTableData } from './actions';
import { getOverdueList } from '../api';

function* getTableData(action) {
    yield put(tobrChangeTableLoading(true));
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
            yield put(tobrSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(tobrChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TOBR_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
