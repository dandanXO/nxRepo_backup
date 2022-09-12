import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { OBR_GET_TABLE_DATA, obrChangeTableLoading, obrSetTableData } from './actions';
import { getOverdueList } from '../api';

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

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
