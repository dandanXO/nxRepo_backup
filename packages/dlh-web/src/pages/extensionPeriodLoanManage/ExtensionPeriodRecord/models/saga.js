import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    epRedChangeTableLoading,
    epRedSetTableData,
    EP_RED_GET_TABLE_DATA,
    EP_RED_GET_MODAL_DATA,
    epRedSetModalData,
    epRedChangeModalLoading,
    epRedChangeModalVisible } from './actions';
import { getListData, listDetail  } from '../api';




//获取统计列表
function* getTableData(action) {
    yield put(epRedChangeTableLoading(true));
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

            yield put(epRedSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(epRedChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(EP_RED_GET_TABLE_DATA, getTableData);
}

function* getDetail(action) {
    yield put(epRedChangeModalVisible(true));
    yield put(epRedChangeModalLoading(true));
    try{
        const res = yield call(listDetail, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data['records'] || [],
                total: data['totalRecords'],
                current: data['currentPage']
            };
            yield put(epRedSetModalData(obj))
        }
    } catch (e) {

    }
    yield put(epRedChangeModalLoading(false));
}

function* watchGetDetail() {
    yield takeEvery(EP_RED_GET_MODAL_DATA, getDetail);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetail)
    ])
}
