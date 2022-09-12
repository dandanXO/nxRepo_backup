
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  REG_GET_TABLE_DATA,
  REG_GET_SOURCE_DATA,
  regSetTableData,
  regSetSourceData,
  regChangeTableLoading,
} from "./actions";
import { tableList, sourceList } from '../api';

function* getTableData(action) {
    yield put(regChangeTableLoading(true));
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
        yield put(regSetTableData(obj))
    } catch (e) {
        console.log(e);
    }
    yield put(regChangeTableLoading(false));
}
function* watchGetTableData() {
    yield takeEvery(REG_GET_TABLE_DATA, getTableData)
}

function* getSourceData(action){
    try{
        const res = yield call(sourceList, action.params);
        if (Number(res.code) === 200){
            const { data } = res;
            yield put(regSetSourceData(data.records || []))
        }
    }catch (e){
        console.log(e);
    }
}

function* watchGetSourceData(){
    yield takeEvery(REG_GET_SOURCE_DATA, getSourceData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetSourceData)
    ]);
}
