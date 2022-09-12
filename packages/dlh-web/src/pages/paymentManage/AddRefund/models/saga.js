import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { ARD_GET_TABLE_DATA, ARD_ADD_TABLE_RECORD, ardSetTableData, ardChangeVisible, ardChangeLoading, ardChangeBtnLoading } from './actions';
import { getListData, addRecord } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(ardChangeLoading(true));
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

            yield put(ardSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(ardChangeLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ARD_GET_TABLE_DATA, getTableData);
}

function* addRecordData(action) {
    yield put(ardChangeBtnLoading(true));
    try {
        const res = yield call(addRecord,action.params);
        if(Number(res.code) === 200) {
            message.success("操作成功");
            yield put(ardChangeVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
    yield put(ardChangeBtnLoading(false));
}

function* watchAddRecordData() {
    yield takeEvery(ARD_ADD_TABLE_RECORD, addRecordData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddRecordData)
    ])
}
