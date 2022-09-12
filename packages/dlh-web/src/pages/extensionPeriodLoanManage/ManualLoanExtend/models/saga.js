import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { mLoanExtendChangeLoading, mLoanExtendSetTableData, MLE_GET_TABLE_DATA, mLoanExtendChangeBtnLoading, mLoanExtendChangeVisible, MLE_ADD_TABLE_RECORD } from './actions';
import { getListData, addRecord } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(mLoanExtendChangeLoading(true));
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

            yield put(mLoanExtendSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(mLoanExtendChangeLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(MLE_GET_TABLE_DATA, getTableData);
}

function* addRecordData(action) {
    yield put(mLoanExtendChangeBtnLoading(true));
    try {
        const res = yield call(addRecord,action.params);
        if(Number(res.code) === 200) {
            message.success("操作成功");
            yield put(mLoanExtendChangeVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
    yield put(mLoanExtendChangeBtnLoading(false));
}

function* watchAddRecordData() {
    yield takeEvery(MLE_ADD_TABLE_RECORD, addRecordData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddRecordData)
    ])
}
