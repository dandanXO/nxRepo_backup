import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import {
    TORD_GET_ORDER_DETAIL,
    TORD_LOOK_URGE_RECORD,
    TORD_GET_URGE_RECORD,
    TORD_PARTIAL_REPAYMENT,
    TORD_GET_DETAIL_TAB_CONTROL,
    TORD_GET_ADDRESS_BOOK,
    TORD_GET_SMS_MESSAGE,
    tordChangeRrecordModal,
    tordSetUrgeRecord,
    tordChangeModalVisible,
    tordSetOrderDetail,
    TORD_ADD_URGE_RECORD,
    tordGetUrgeRecord,
    ordGetOrderDetail,
    tordChangeRepaymentModalVisible,
    tordSetMessageContent,
    tordChangeMessageModalVisible,
    tordSetDetailTabControl,
    tordSetAddressBook,
    tordSetSmsMessage
} from './actions';
import { getOperator, getOrderDetail, getUserContacts, getUserSmsLogs, addUrgeRecord, getUrgeRecord, partialRepayment, getDetailTabControl } from '../api';
import { converData, userConvertData } from './convertData';
const detailSelector = (state) => state.todayLoanManageState.todayOrderDetailState.orderData;

function* getOperatorData(action) {
    try {
        const resOperator = yield call(getOperator, action.userParams);
        if(Number(resOperator.code) === 200) {
            const detail = yield select(detailSelector);
            const orderInfo = { ...detail, operator: { photoRecord: resOperator['data'] } };
            yield put(tordSetOrderDetail(orderInfo));
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
        yield put(tordSetAddressBook(obj));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetContactsData() {
    yield takeEvery(TORD_GET_ADDRESS_BOOK, getContactsData);
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
        yield put(tordSetSmsMessage(obj));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetSmsLogsData() {
    yield takeEvery(TORD_GET_SMS_MESSAGE, getSmsLogsData);
}

function* getDetail(action) {
    try{
        const resDetail = yield call(getOrderDetail, action.overdueParams);
        if(Number(resDetail.code) === 200) {
            const detail = yield select(detailSelector);
            const source = detail['orderInfo'] || {};
            const orderInfo = { ...detail, orderInfo: {...source,  ...converData(resDetail['data']) }, userInfo: userConvertData(resDetail['data']) };
            yield put(tordSetOrderDetail(orderInfo));
        }
    } catch (e) {

    }
}

function* watchGetDetail() {
    yield takeEvery(TORD_GET_ORDER_DETAIL, getDetail);
}

//查看逾期记录
function* lookUrgeRecord(action) {
    try {
        const res = yield call(getUrgeRecord, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(tordSetUrgeRecord(data || []));
            yield put(tordChangeRrecordModal(true));
        }
    } catch (e) {

    }
}
function* watchLookUrgeRecord() {
    yield takeEvery(TORD_LOOK_URGE_RECORD, lookUrgeRecord);
}
//添加逾期记录
function* addUrgeList(action) {
    try {
        const res = yield call(addUrgeRecord, action.params);
        if(Number(res.code) === 200) {
            console.log(res);
            message.success('操作成功');
           yield put(tordChangeModalVisible(false));
           action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchAddUrgeList() {
    yield takeEvery(TORD_ADD_URGE_RECORD, addUrgeList);
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
            yield put(tordSetOrderDetail(newData));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetAllUrgeRecord() {
    yield takeEvery(TORD_GET_URGE_RECORD, getAllUrgeRecord);
}

//拉空單
function* sendPartialRepayment(action) {
    try {
        const res = yield call(partialRepayment, action.params);
        if (res.remark) {
            const { todayId } = action.params;
            message.success('操作成功')
            yield put(tordSetMessageContent(res.remark))
            yield put(tordChangeRepaymentModalVisible(false))
            yield put(tordChangeMessageModalVisible(true))
            yield put(tordGetUrgeRecord({ overdueId: todayId }))
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchPartialRepayment() {
    yield takeEvery(TORD_PARTIAL_REPAYMENT, sendPartialRepayment);
}

//取得detail頁 tab的開關
function* getDetailTabControlData(action) {
    try {
        const res = yield call(getDetailTabControl);
        yield put(tordSetDetailTabControl(res.todayCollect));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetDetailTabControlData() {
    yield takeEvery(TORD_GET_DETAIL_TAB_CONTROL, getDetailTabControlData);
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
