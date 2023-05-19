import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import {
    ORD_GET_ORDER_DETAIL,
    ORD_LOOK_URGE_RECORD,
    ORD_GET_URGE_RECORD,
    ORD_PARTIAL_REPAYMENT,
    ORD_GET_DETAIL_TAB_CONTROL,
    ORD_GET_ADDRESS_BOOK,
    ORD_GET_SMS_MESSAGE,
    ordChangeRrecordModal,
    ordSetUrgeRecord,
    ordChangeModalVisible,
    ordSetOrderDetail,
    ORD_ADD_URGE_RECORD,
    ordGetUrgeRecord,
    ordGetOrderDetail,
    ordChangeRepaymentModalVisible,
    ordSetMessageContent,
    ordChangeMessageModalVisible,
    ordSetDetailTabControl,
    ordSetAddressBook,
    ordSetSmsMessage
} from './actions';
import { getOperator, getOrderDetail, getUserContacts, getUserSmsLogs, addUrgeRecord, getUrgeRecord, partialRepayment, getDetailTabControl } from '../api';
import { converData, userConvertData } from './convertData';
const detailSelector = (state) => state.afterLoanManageState.orderDetailState.orderData;

function* getOperatorData(action) {
    try {
        const resOperator = yield call(getOperator, action.userParams);
        if(Number(resOperator.code) === 200) {
            const detail = yield select(detailSelector);
            const orderInfo = { ...detail, operator: { photoRecord: resOperator['data'] } };
            yield put(ordSetOrderDetail(orderInfo));
        }
    } catch (e) {
        console.log(e);
    }

}
function* getContactsData(action) {
    try {
        const res = yield call(getUserContacts, action.params);
        const obj = {
            data: res.records || [],
            pagination: {
                total: res.totalRecords,
                current: res.records.length === 0 ? 0 : res.currentPage,
            }
        }
        yield put(ordSetAddressBook(obj));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetContactsData() {
    yield takeEvery(ORD_GET_ADDRESS_BOOK, getContactsData);
}

function* getSmsLogsData(action) {
    try {
        const res = yield call(getUserSmsLogs, action.params);

        const obj = {
            data: res.records || [],
            pagination: {
                total: res.totalRecords,
                current: res.records.length === 0 ? 0 : res.currentPage,
            }
        }
        yield put(ordSetSmsMessage(obj));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetSmsLogsData() {
    yield takeEvery(ORD_GET_SMS_MESSAGE, getSmsLogsData);
}

function* getDetail(action) {
    try{
        const resDetail = yield call(getOrderDetail, action.overdueParams);
        // const resOperator = yield call(getOperator, action.userParams);
        // const resContacts = yield call(getUserContacts, action.userParams);
        if(Number(resDetail.code) === 200) {
            const detail = yield select(detailSelector);
            const source = detail['orderInfo'] || {};
            const orderInfo = { ...detail, orderInfo: {...source,  ...converData(resDetail['data']) }, userInfo: userConvertData(resDetail['data']) };
            yield put(ordSetOrderDetail(orderInfo));
        }
        // if(Number(resOperator.code) === 200) {
        //     const detail = yield select(detailSelector);
        //     const orderInfo = { ...detail, operator: { photoRecord: resOperator['content'] } };
        //     yield put(ordSetOrderDetail(orderInfo));
        // }
        // if(Number(resContacts.code) === 200) {
        //     const detail = yield select(detailSelector);
        //     const orderInfo = { ...detail, addressBook: resContacts['content'] || [] };
        //     yield put(ordSetOrderDetail(orderInfo));
        // }
    } catch (e) {

    }
}

function* watchGetDetail() {
    yield takeEvery(ORD_GET_ORDER_DETAIL, getDetail);
}

//查看逾期记录
function* lookUrgeRecord(action) {
    try {
        const res = yield call(getUrgeRecord, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(ordSetUrgeRecord(data || []));
            yield put(ordChangeRrecordModal(true));
        }
    } catch (e) {

    }
}
function* watchLookUrgeRecord() {
    yield takeEvery(ORD_LOOK_URGE_RECORD, lookUrgeRecord);
}
//添加逾期记录
function* addUrgeList(action) {
    try {
        const res = yield call(addUrgeRecord, action.params);
        if(Number(res.code) === 200) {
            console.log(res);
            message.success('操作成功');
           yield put(ordChangeModalVisible(false));
           action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchAddUrgeList() {
    yield takeEvery(ORD_ADD_URGE_RECORD, addUrgeList);
}

//获取催收记录
function* getAllUrgeRecord(action) {
    try {
        const res = yield call(getUrgeRecord, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const detail = yield select(detailSelector);
            const orderInfo = detail['orderInfo'] || {};
            const newData = { ...detail, orderInfo: { ...orderInfo, urgeRecord: data } };
            yield put(ordSetOrderDetail(newData));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetAllUrgeRecord() {
    yield takeEvery(ORD_GET_URGE_RECORD, getAllUrgeRecord);
}

//拉空單
function* sendPartialRepayment(action) {
    try {
        const res = yield call(partialRepayment, action.params);
        if (res.remark) {
            const { overdueId } = action.params;
            message.success('操作成功');
            yield put(ordSetMessageContent(res.remark));
            yield put(ordChangeRepaymentModalVisible(false));
            yield put(ordChangeMessageModalVisible(true));
            yield put(ordGetUrgeRecord({ overdueId }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchPartialRepayment() {
    yield takeEvery(ORD_PARTIAL_REPAYMENT, sendPartialRepayment);
}

//取得detail頁 tab的開關
function* getDetailTabControlData(action) {
    try {
        const res = yield call(getDetailTabControl);
        yield put(ordSetDetailTabControl(res.overDueCollect));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetDetailTabControlData() {
    yield takeEvery(ORD_GET_DETAIL_TAB_CONTROL, getDetailTabControlData);
}


export default function* root() {
    yield all([
        fork(watchGetDetail),
        fork(watchLookUrgeRecord),
        fork(watchAddUrgeList),
        fork(watchGetAllUrgeRecord),
        fork(watchPartialRepayment),
        fork(watchGetDetailTabControlData),
        fork(watchGetContactsData),
        fork(watchGetSmsLogsData)
    ])
}
