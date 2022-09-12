import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { ADSC_GET_TABLE_DATA, adscChangeTableLoading, adscSetTableData } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(adscChangeTableLoading(true));
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
            yield put(adscSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(adscChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ADSC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
