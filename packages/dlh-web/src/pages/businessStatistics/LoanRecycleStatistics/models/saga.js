import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { LRS_GET_TABLE_DATA, lrsSetTableData, lrsChangeTableLoading } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(lrsChangeTableLoading(true));
    try{
        const res = yield call(getListData, action.params);
        if (Number(res.code) === 200) {
            const { data: content } = res;
            const obj = {
                data: content || []
            }
            yield put(lrsSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(lrsChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(LRS_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
