import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { orEdRrdChangeTableLoading, orEdRrdSetTableData, OR_ED_RRD_GET_TABLE_DATA } from './actions';
import { getListData } from '../api';



//获取统计列表
function* getTableData(action) {
    yield put(orEdRrdChangeTableLoading(true));
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

            yield put(orEdRrdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(orEdRrdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OR_ED_RRD_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
