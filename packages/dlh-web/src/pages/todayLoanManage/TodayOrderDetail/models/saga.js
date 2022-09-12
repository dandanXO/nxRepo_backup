import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import {
    TORD_GET_ORDER_DETAIL,
    TORD_LOOK_URGE_RECORD,
    TORD_GET_URGE_RECORD,
    TORD_PARTIAL_REPAYMENT,
    tordChangeRrecordModal,
    tordSetUrgeRecord,
    tordChangeModalVisible,
    tordSetOrderDetail,
    TORD_ADD_URGE_RECORD,
    tordGetUrgeRecord,
    ordGetOrderDetail,
    tordChangeRepaymentModalVisible,
    tordSetMessageContent,
    tordChangeMessageModalVisible
} from './actions';
import { getOperator, getOrderDetail, getUserContacts, addUrgeRecord, getUrgeRecord, partialRepayment } from '../api';
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
        const resContacts = yield call(getUserContacts, action.userParams);
        if(Number(resContacts.code) === 200) {
            const detail = yield select(detailSelector);
            const orderInfo = { ...detail, addressBook: resContacts['data'] || [] };
            yield put(tordSetOrderDetail(orderInfo));
        }
    } catch (e) {
        console.log(e);
    }

}


function* getDetail(action) {
    yield fork(getContactsData, action);
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


export default function* root() {
    yield all([
        fork(watchGetDetail),
        fork(watchLookUrgeRecord),
        fork(watchAddUrgeList),
        fork(watchGetAllUrgeRecord),
        fork(watchPartialRepayment)
    ])
}
