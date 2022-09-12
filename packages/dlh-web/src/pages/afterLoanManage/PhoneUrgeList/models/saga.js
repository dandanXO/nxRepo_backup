import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { PUL_GET_TABLE_DATA, pulChangeTableLoading, pulSetTableData } from './actions';
import { getOrderListData } from '../api';

function* getTableData(action) {
    yield put(pulChangeTableLoading(true));
    try{
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(pulSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(pulChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PUL_GET_TABLE_DATA, getTableData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
