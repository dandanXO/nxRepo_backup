/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message, Modal } from 'antd';
import {
    RPL_GET_TABLE_DATA,
    RPL_GET__MODAL_DATA,
    RPL_REPEAT_PAY,
    RPL_BATCH_RELOAN,
    RPL_REFUSE_LOAN,
    rplChangeModalLoading,
    rplChangeModalVisible,
    rplChangeTableLoading,
    rplSetModalData,
    rplSetTableData,
    rplChangeSelectKey,
} from './actions';
import { listData, listDetail, listPay, listBatchPay, refuseLoan } from '../api';
import React from 'react';

function* getTableData(action) {
    yield put(rplChangeTableLoading(true));
    try {
        const res = yield call(listData, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data['records'] || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            }
            yield put(rplSetTableData(obj));
            // 取消勾选
            yield put(rplChangeSelectKey([]));
        }
    } catch (e) {

    }
    yield put(rplChangeTableLoading(false));
    action.callback && action.callback();
}

function* watchGetTableData() {
    yield takeEvery(RPL_GET_TABLE_DATA, getTableData);
}

function* getDetail(action) {
    yield put(rplChangeModalVisible(true));
    yield put(rplChangeModalLoading(true))
    try {
        const res = yield call(listDetail, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data['records'] || [],
                total: data['totalRecords'],
                current: data['currentPage']
            };
            yield put(rplSetModalData(obj))
        }
    } catch (e) {
        console.log(e);
    }
    yield put(rplChangeModalLoading(false));
}

function* watchGetDetail() {
    yield takeEvery(RPL_GET__MODAL_DATA, getDetail);
}

function* repeatPayLoan(action) {
    let hide = message.loading('正在放款...', 0);
    try {
        const res = yield call(listPay, action.params);
        if (Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
        hide && hide();
    } catch (e) {
        hide && hide();
    }
}

function* watchRepeatPayLoan() {
    yield takeEvery(RPL_REPEAT_PAY, repeatPayLoan);
}

function* batchRepeatPayLoan(action) {
    let hide = message.loading('正在放款...', 0);
    try {
        const res = yield call(listBatchPay, action.params);
        if (Number(res.code) === 200) {
            if (res.results) {
                Modal.info({
                    title: '執行結果',
                    content: res.results.map(result => <div>單號:{result.orderNo} 執行結果:{result.success ? '成功' : '失敗'} {!result.success && '訊息:' + result.message}</div>),
                    width: 1000
                });
            } else {
                message.success('操作成功');
            }
        }
        action.callback && action.callback();
        hide && hide();
    } catch (e) {
        hide && hide();
    }
}

function* watchBatchRepeatPayLoan() {
    yield takeEvery(RPL_BATCH_RELOAN, batchRepeatPayLoan);
}

function* batchRefuseLoan(action) {
    let hide = message.loading('', 0);
    try {
        const res = yield call(refuseLoan, action.params);
        if (Number(res.code) === 200) {
            message.success('操作成功');
        }
        action.callback && action.callback();
        hide && hide();
    } catch (e) {
        action.callback && action.callback();
        hide && hide();
    }
}

function* watchBatchRefuse() {
    yield takeEvery(RPL_REFUSE_LOAN, batchRefuseLoan);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetail),
        fork(watchRepeatPayLoan),
        fork(watchBatchRepeatPayLoan),
        fork(watchBatchRefuse)
    ]);
}