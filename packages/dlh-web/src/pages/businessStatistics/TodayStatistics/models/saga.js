import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  TD_GET_TABLE_DATA,
  tdChangeTableLoading,
  tdSetTableData,
  TD_GET_COLLECTOR_DATA,
  tdSetCollectorData,
  tdChangeCollectorLoading,
} from "./actions";
import { tableList ,collectorList} from '../api';

function* getTableData(action) {
    yield put(tdChangeTableLoading(true));
    try {
        const res = yield call(tableList, action.params);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size
            }
        }
        yield put(tdSetTableData(obj))
    } catch (e) {

    }
    yield put(tdChangeTableLoading(false));
}
function* watchGetTableData() {
    yield takeEvery(TD_GET_TABLE_DATA, getTableData)
}

function* getCollectorData (action) {
    yield put(tdChangeCollectorLoading(true));
    try {
        const res = yield call(collectorList, action.params);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size
            }
        }
        yield put(tdSetCollectorData(obj))
    } catch (e) {

    }
    yield put(tdChangeCollectorLoading(false));
}
function* watchGetCollectorData () {
    yield takeEvery(TD_GET_COLLECTOR_DATA, getCollectorData)
}


export default function* root () {
    yield all([
        fork(watchGetTableData),
        fork(watchGetCollectorData)
    ]);
}
