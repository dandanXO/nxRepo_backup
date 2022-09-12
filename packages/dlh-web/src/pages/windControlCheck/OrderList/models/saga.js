import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    ORL_GET_TABLE_DATA,
    orlChangeTableLoading,
    orlSetTableData,
    ORL_GET_ORDER_DETAIL,
    ORL_GET_AUTH_DATA,
    orlChangeAuthModal,
    orlSetAuthData,
    orlSetOrderDetail,
    orlChangeDetailModal,
    ORL_RESET_OPERATOR
} from './actions';
import { getOrderListData, getOrderDetail, authList, resetOperator } from '../api';
import { axios } from 'utils';
import { convertBaseInfo } from './convertData';

function* getTableData(action) {
    yield put(orlChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(orlSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(orlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ORL_GET_TABLE_DATA, getTableData);
}

function* getDetailData(action) {
    try {
        const res = yield call(getOrderDetail, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const newData = convertBaseInfo(data);
            yield put(orlSetOrderDetail(newData));
            yield put(orlChangeDetailModal(true));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetDetailData() {
    yield takeEvery(ORL_GET_ORDER_DETAIL, getDetailData);
}

function* getAuthData(action) {
    try {
        const res = yield call(authList, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(orlSetAuthData(data));
            yield put(orlChangeAuthModal(true));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetAuthData() {
    yield takeEvery(ORL_GET_AUTH_DATA, getAuthData);
}

function* postResetOperator(action) {
    try {
        const res = yield call(resetOperator, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
        }
    } catch (e) {

    }
}
function* watchPostResetOperator() {
    yield takeEvery(ORL_RESET_OPERATOR, postResetOperator);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetailData),
        fork(watchGetAuthData),
        fork(watchPostResetOperator)
    ])
}
