import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    RIL_GET_TABLE_DATA,
    rilSetTableData,
    rilChangeTableLoading,
    RIL_CONFIRM_RECEIVE,
    RIL_GET_EXPRESS_COMPANY,
    RIL_GET_MODAL_DETAIL,
    rilChangeDetailModal,
    rilSetModalDetail,
    rilSetExpressCompany,
    RIL_GET_REFUSE_REASON,
    rilSetRefuseReason,
    RIL_SUBMIT_CLOSE_REASON
} from './actions';
import { getOrderListData, postConfirm, postDetail, postClose, getExpressCompany, getRefuseReason } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(rilChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { content } = res;
            const obj = {
                data: content.records || [],
                pagination: {
                    total: content.totalRecords,
                    current: content.currentPage
                }
            }
            yield put(rilSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(rilChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RIL_GET_TABLE_DATA, getTableData);
}

//确认收货
function* confirmGoods(action) {
    try {
        const res = yield call(postConfirm, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }


}
function* watchConfirmGoods() {
    yield takeEvery(RIL_CONFIRM_RECEIVE, confirmGoods);
}

//获取快递公司
function* getExpress(action) {
    try{
        const res = yield call(getExpressCompany, action.params);
        if(Number(res.code) === 200) {
            const { content = [] } = res;
            yield put(rilSetExpressCompany(content));
        }
    } catch (e) {

    }
}
function* watchGetExpress() {
    yield takeEvery(RIL_GET_EXPRESS_COMPANY, getExpress);
}
//获取拒绝原因
function* getExpressRefuseReason(action) {
    try {
        const res = yield call(getRefuseReason, action.params);
        if(Number(res.code) === 200) {
            const { content = [] } = res;
            yield put(rilSetRefuseReason(content));
        }
    } catch (e) {

    }
}

function* watchGetExpressRefuseReason() {
    yield takeEvery(RIL_GET_REFUSE_REASON, getExpressRefuseReason)
}


//获取详情
function* getDetail(action) {
    try{
        const res = yield call(postDetail, action.params);
        if(Number(res.code) === 200) {
            yield put(rilSetModalDetail(res.content || {}));
            yield put(rilChangeDetailModal(true));
        }
    } catch (e) {

    }
}
function* watchGetDetail() {
    yield takeEvery(RIL_GET_MODAL_DETAIL, getDetail);
}

function* closeExpress(action) {
    try {
        const res = yield call(postClose,action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchCloseExpress() {
    yield takeEvery(RIL_SUBMIT_CLOSE_REASON, closeExpress);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchConfirmGoods),
        fork(watchGetExpress),
        fork(watchGetDetail),
        fork(watchGetExpressRefuseReason),
        fork(watchCloseExpress)
    ])
}
