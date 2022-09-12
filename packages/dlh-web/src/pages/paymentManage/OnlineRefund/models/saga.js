import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { olArdChangeLoading, olArdSetTableData, OL_ARD_GET_TABLE_DATA, olArdChangeBtnLoading, olArdChangeVisible, OL_ARD_ADD_TABLE_RECORD } from './actions';
import { getListData, addRecord } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(olArdChangeLoading(true));
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

            yield put(olArdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(olArdChangeLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OL_ARD_GET_TABLE_DATA, getTableData);
}

function* addRecordData(action) {
    yield put(olArdChangeBtnLoading(true));
    try {
        const res = yield call(addRecord,action.params);
        if(Number(res.code) === 200) {
            message.success("操作成功");
            yield put(olArdChangeVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
    yield put(olArdChangeBtnLoading(false));
}

function* watchAddRecordData() {
    yield takeEvery(OL_ARD_ADD_TABLE_RECORD, addRecordData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddRecordData)
    ])
}
