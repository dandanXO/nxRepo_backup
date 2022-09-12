import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { NOSC_GET_TABLE_DATA, noscChangeTableLoading, noscSetTableData } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(noscChangeTableLoading(true));
    try{
        const res = yield call(getListData, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(noscSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(noscChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(NOSC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
