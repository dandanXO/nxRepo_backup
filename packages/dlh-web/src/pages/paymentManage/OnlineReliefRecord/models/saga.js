import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { olRrdChangeTableLoading, olRrdSetTableData, OL_RRD_GET_TABLE_DATA } from './actions';
import { getListData } from '../api';



//获取统计列表
function* getTableData(action) {
    yield put(olRrdChangeTableLoading(true));
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

            yield put(olRrdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(olRrdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OL_RRD_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
