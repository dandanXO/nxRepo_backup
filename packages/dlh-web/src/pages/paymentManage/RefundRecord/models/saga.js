import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { RRD_GET_TABLE_DATA, rrdChangeTableLoading, rrdSetTableData } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(rrdChangeTableLoading(true));
    try{
        const res = yield call(getListData, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            };

            yield put(rrdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(rrdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RRD_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
