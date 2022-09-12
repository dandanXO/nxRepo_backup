import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { dscOscChangeTableLoading, dscOscSetTableData, DSC_OSC_GET_TABLE_DATA } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData (action) {
    yield put(dscOscChangeTableLoading(true));
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
        yield put(dscOscSetTableData(obj));

    } catch (e) {
        console.log(e);
    }
    yield put(dscOscChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(DSC_OSC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
