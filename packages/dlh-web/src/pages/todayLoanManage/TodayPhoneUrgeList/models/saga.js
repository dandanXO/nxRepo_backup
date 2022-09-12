import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { TPUL_GET_TABLE_DATA, tpulChangeTableLoading, tpulSetTableData } from './actions';
import { getOrderListData } from '../api';

function* getTableData(action) {
    yield put(tpulChangeTableLoading(true));
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
            yield put(tpulSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(tpulChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TPUL_GET_TABLE_DATA, getTableData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
