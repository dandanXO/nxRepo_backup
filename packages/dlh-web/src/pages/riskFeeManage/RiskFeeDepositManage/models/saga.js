import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    RFM2_GET_TABLE_DATA,
    rfm2ChangeTableLoading,
    rfm2SetTableData,
    RFM2_ADD_TABLE_DATA,
    rfm2ChangeModalVisible,
    rfm2AddTableData,
    rfm2GetTableData
  } from "./actions";
import { getRiskFeeDepositManageData, addRiskFeeDeposit } from '../api';
import { axios } from 'utils';
import { message } from 'antd';

function* getTableData(action) {
    yield put(rfm2ChangeTableLoading(true));
    try{
        const res = yield call(getRiskFeeDepositManageData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(rfm2SetTableData(obj));
        }
    } catch (e) {

    }
    yield put(rfm2ChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RFM2_GET_TABLE_DATA, getTableData);
}
``
function* addRiskFee(action) {
    try{
        const res = yield call(addRiskFeeDeposit, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(rfm2ChangeModalVisible(false));
            yield put(rfm2GetTableData({ pageSize: 10, pageNum: 1 , resonType:0}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddRiskFee() {
    yield takeEvery(RFM2_ADD_TABLE_DATA, addRiskFee);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddRiskFee)
    ])
}
