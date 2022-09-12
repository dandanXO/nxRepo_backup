import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { BLM_GET_TABLE_DATA, BLM_ADD_TABLE_DATA, blmChangeTableLoading, blmGetTableData, blmSetTableData, blmChangeModalVisible } from './actions';
import { getBlackListManageData, addBlackListManageData } from '../api';
import { message } from 'antd';

function* getTableData(action) {
    yield put(blmChangeTableLoading(true));
    try{
        const res = yield call(getBlackListManageData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(blmSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(blmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(BLM_GET_TABLE_DATA, getTableData);
}

function* addBlack (action) {
    try {
        const { phoneNo, reason, ...params } = action.params
        const res = yield call(addBlackListManageData, { phoneNo, reason });
        if (phoneNo !== "0" && res.message !== "") {
            message.warning(res.message);
            return;
        }
        message.success(res.message !== "" ? res.message : '操作成功');
        yield put(blmGetTableData({ ...params }));
        yield put(blmChangeModalVisible(false));
    } catch (e) {
        console.log(e);
    }
}

function* watchAddBlack() {
    yield takeEvery(BLM_ADD_TABLE_DATA, addBlack);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddBlack)
    ])
}
