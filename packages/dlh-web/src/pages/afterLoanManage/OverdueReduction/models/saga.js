import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { orChangeLoading, orSetTableData, orChangeBtnLoading, orChangeVisible, DUE_OR_GET_TABLE_DATA, DUE_OR_ADD_TABLE_RECORD } from './actions';
import { getListData, addRecord } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(orChangeLoading(true));
    try {
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
            yield put(orSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(orChangeLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(DUE_OR_GET_TABLE_DATA, getTableData);
}

function* addRecordData(action) {
    yield put(orChangeBtnLoading(true));
    try {
        const res = yield call(addRecord, action.params);
        if (Number(res.code) === 200) {
            message.success("操作成功");
            yield put(orChangeVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
    yield put(orChangeBtnLoading(false));
}

function* watchAddRecordData() {
    yield takeEvery(DUE_OR_ADD_TABLE_RECORD, addRecordData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddRecordData)
    ])
}
