import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import {
    UIM_GET_TABLE_DATA,
    uimChangeTableLoading,
    uimSetTableData,
    UIM_GO_BLACK_LIST,
    UIM_PUSH_BLACK_LIST,
    uimChangeVisible,
    uimChangeAddModalVisible,
    UIM_GET_DETAIL_DATA,
    UIM_GET_APPLY_DATA,
    UIM_GET_CONTACTS_DATA,
    UIM_GET_OPERATOR_DATA,
    UIM_GET_SMS_LOG_DATA,
    uimSetDetailData,
    uimSetApplyData,
    uimSetContactsData,
    uimSetOperatorData,
    uimChangeModalLoading,
    uimSetSMSLogData,
    UIM_IMPORT_TEL_SALE_DATA
} from './actions';
import { getUserInfoManageData, goBlackList, pushBlackList, contactsRecord, operatorRecord, applyRecord, userDetail, smsLogRecord ,importTelSaleList } from '../api';
import { axios } from 'utils';
import { message } from 'antd';


function* getTableData(action) {
    yield put(uimChangeTableLoading(true));
    try{
        const res = yield call(getUserInfoManageData, action.params);
        const obj = {
            data: res.content,
            pagination: {
                total: res.totalElements,
                current: res.content == [] ? 0 : res.number + 1,
                pageSize: res.size
            }
        }
            yield put(uimSetTableData(obj));
    } catch (e) {
        console.log(e);
    }

    yield put(uimChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(UIM_GET_TABLE_DATA, getTableData);
}

function* goBlackListData(action) {
    const res = yield call(goBlackList, action.params);
    if(Number(res.code) === 200) {
        message.success(res.data.msg);
        yield put(uimChangeVisible(false));
        action.callback && action.callback();
    }
}

function* watchGoBlackListData() {
    yield takeEvery(UIM_GO_BLACK_LIST, goBlackListData)
}

function* pushBlackListData(action) {
    const res = yield call(pushBlackList, action.params);
    if(Number(res.code) === 200) {
        message.success(res.data.msg);
        yield put(uimChangeAddModalVisible(false));
        action.callback && action.callback();
    }
}

function* watchPushBlackListData() {
    yield takeEvery(UIM_PUSH_BLACK_LIST, pushBlackListData)
}


function* getUserDetail(action) {
    try {
        const res = yield call(userDetail, action.params);
        if(Number(res.code) === 200) {
            const data = res['data'];
            let userInfo = data['userInfo'] || {},
                userImage = data['userImage'] || {},
                userAuthenInfo = data['userAuthenInfo'] || {},
                userThirdInfo = data['userThirdInfo'] || {},
                emergencyContacts = data['emergencyContacts'] || [];
            let obj = { ...userInfo, ...userImage, ...userAuthenInfo, ...userThirdInfo, emergencyContacts };
            yield put(uimSetDetailData(obj));
        }
    } catch (e) {

    }
}
function* watchGetUserDetail() {
    yield takeEvery(UIM_GET_DETAIL_DATA, getUserDetail);
}

function* getApplyRecord(action) {
    yield put(uimChangeModalLoading(true));
    try{
        const res = yield call(applyRecord, action.params);
        if(Number(res.code) === 200) {
            yield put(uimSetApplyData(res.data['records'] || []));
        }
    } catch (e) {

    }
    yield put(uimChangeModalLoading(false));
}
function* watchGetApplyRecord() {
    yield takeEvery(UIM_GET_APPLY_DATA, getApplyRecord);
}

function* getOperatorRecord(action) {
    yield put(uimChangeModalLoading(true));
    try {
        const res = yield call(operatorRecord, action.params);
        if(Number(res.code) === 200) {
            yield put(uimSetOperatorData(res['data'] || []));
        }
    } catch (e) {

    }
    yield put(uimChangeModalLoading(false));
}

function* watchGetOperatorRecord() {
    yield takeEvery(UIM_GET_OPERATOR_DATA, getOperatorRecord);
}

function* getContactsRecord(action) {
    yield put(uimChangeModalLoading(true));
    try {
        const res = yield call(contactsRecord, action.params);
        if(Number(res.code) === 200) {
            yield put(uimSetContactsData(res.data['records'] || []));
        }
    } catch (e) {

    }
    yield put(uimChangeModalLoading(false));
}

function* watchGetContactsRecord() {
    yield takeEvery(UIM_GET_CONTACTS_DATA, getContactsRecord);
}

function* getSMSLogs(action) {
    yield put(uimChangeModalLoading(true));
    try {
        const res = yield call(smsLogRecord, action.params);
        if(Number(res.code) === 200) {
            yield put(uimSetSMSLogData(res.data || []));
        }
    } catch (e) {

    }
    yield put(uimChangeModalLoading(false));
}

function* watchGetSMSLogs() {
    yield takeEvery(UIM_GET_SMS_LOG_DATA, getSMSLogs);
}

function* importTelSaleData (action) {

    try {
        yield call(importTelSaleList, action.params);
    } catch (e) {

    }
}

function* watchImportTelSaleData () {
    yield takeEvery(UIM_IMPORT_TEL_SALE_DATA, importTelSaleData);
}



export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGoBlackListData),
        fork(watchPushBlackListData),
        fork(watchGetUserDetail),
        fork(watchGetApplyRecord),
        fork(watchGetOperatorRecord),
        fork(watchGetContactsRecord),
        fork(watchGetSMSLogs),
        fork(watchImportTelSaleData)
    ])
}
