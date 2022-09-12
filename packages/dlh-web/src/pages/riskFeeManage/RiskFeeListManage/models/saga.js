import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { RFM_GET_TABLE_DATA, rfmChangeTableLoading, rfmSetTableData } from './actions';
import { getRiskFeeListManageData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(rfmChangeTableLoading(true));
    try{
        const res = yield call(getRiskFeeListManageData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(rfmSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(rfmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RFM_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
