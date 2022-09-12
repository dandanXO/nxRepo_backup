import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { OSC_GET_TABLE_DATA, oscChangeTableLoading, oscSetTableData } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(oscChangeTableLoading(true));
    try {
        const res = yield call(getListData, action.params);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size
            }
        }
        yield put(oscSetTableData(obj));
    } catch (e) {
        console.log(e);
    }
    yield put(oscChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OSC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
