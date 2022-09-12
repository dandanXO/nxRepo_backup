import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { QCL_GET_TABLE_DATA, qclChangeTableLoading, qclSetTableData } from './actions';
import { getOrderListData } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(qclChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { content } = res;
            const obj = {
                data: content.records || [],
                pagination: {
                    total: content.totalRecords,
                    current: content.currentPage
                }
            }
            yield put(qclSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(qclChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(QCL_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
