/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { ASS_GET_TABLE_DATA, assChangeTableLoading, assSetTableData } from './actions';
import { tableList } from '../api';

function* getTableData(action) {
    yield put(assChangeTableLoading(true));
    try {
        const res = yield call(tableList, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(assSetTableData(data))
        }
    } catch (e) {

    }
    yield put(assChangeTableLoading(false));
}
function* watchGetTableData() {
    yield takeEvery(ASS_GET_TABLE_DATA, getTableData)
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ]);
}
