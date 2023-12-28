import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  DISTRIBUTELIST,
  distributeList,
  IMPORT_TEL_SALE_PHONE_NUMBERS,
  changeTelSaleImportModalVisible,
  DELETE_TEL_SALE_PHONE_NUMBERS,
  PERSON_OR_GROUP_LIST,
  personOrGroupList,
  DISTRIBUTE_TEL_SALE,
  changeUrgePersonModalVisible,
  RECORDLIST,
  recordList,
  TEL_SALE_LIST_ADD_COLLECTION_RECORD_DATA,
  TEL_SALE_LIST,
  telSaleList,
  GUEST_INFO,
  guestInfo,
  USER_CONTACTS,
  userContacts,
  OVERDUE_COLLECTION,
  overdueCollection,
  STATISTICS_LIST,
  statisticsList,
  TEL_SALE_COLLECTOR_LIST,
  telSaleCollectorList, TEL_SALE_GROUP_LIST, telSaleGroupList
} from "./actions";
import {
    getTelSaleDistribute,
    importPhoneNumbers,
    deletePhoneNumbers,
    getPersonOrGroup,
    distributeTelSale,
    getCollectionRecord,
    addCollectionRecord,
    getTelSaleList,
    getGuestInfo,
    getUserContacts,
    getOverdueCollection,
    getTelSaleStatistics,
    getCollectors,
    getGroups
} from '../api';

import { utilSaga } from 'utils'
const { getTableDataWithPagination, getTableData } = utilSaga;


function* getDistributeList (action) {
    try {
        yield fork(getTableDataWithPagination, distributeList, getTelSaleDistribute, action);

    } catch (e) {
    }
}

function* watchGetDistributeList () {
    yield takeEvery(DISTRIBUTELIST['GET'], getDistributeList);
}

function* importTelSalePhoneNumbers (action) {
    try {
        yield call(importPhoneNumbers, action.params);
        yield put(changeTelSaleImportModalVisible(false));
        yield put(distributeList.get({ phoneNo: "", page: 0, size: 10 }));
    } catch (e) {

    }
}

function* watchImportTelSalePhoneNumbers() {
    yield takeEvery(IMPORT_TEL_SALE_PHONE_NUMBERS, importTelSalePhoneNumbers);
}

function* deleteTelSalePhoneNumbers (action) {
    try {
        yield all(action.params.map(i => call(deletePhoneNumbers, { id: i })));
        yield put(distributeList.get({ phoneNo: "", page: 0, size: 10 }));
    } catch (e) {

    }
}

function* watchDeleteTelSalePhoneNumbers() {
    yield takeEvery(DELETE_TEL_SALE_PHONE_NUMBERS, deleteTelSalePhoneNumbers);
}

function* getPersonOrGroupList (action) {
    personOrGroupList.loading(true);
    try {
        const res = yield call(getPersonOrGroup, action.params);
        const { type, departmentList = [], mssAdminUserList = [] } = res;
        const isGroup = type === 'group';
        const personList = isGroup ? departmentList : mssAdminUserList
        const personData = personList.map((i => ({ name: isGroup ? i.name : i.trueName, value: i.id })))
        yield put(personOrGroupList.set({ personData, type }));
    } catch (e) {

    }
    personOrGroupList.loading(false);
}

function* watchGetPersonOrGroupList() {
    yield takeEvery(PERSON_OR_GROUP_LIST['GET'], getPersonOrGroupList);
}

function* distributeTelSaleData(action) {
    try {
        yield call(distributeTelSale, action.params);
        yield put(changeUrgePersonModalVisible(false));
    } catch (e) {

    }
}

function* watchDistributeTelSaleData() {
    yield takeEvery(DISTRIBUTE_TEL_SALE, distributeTelSaleData);
}

function* getCollectionRecordList (action) {
    try {
        yield fork(getTableDataWithPagination, recordList, getCollectionRecord, action);
    } catch (e) {

    }
}

function* watchGetCollectionRecordList () {
    yield takeEvery(RECORDLIST['GET'], getCollectionRecordList);
}

function* addCollectionRecordData (action) {
    try {
        const { phoneNo } = action.params
        yield call(addCollectionRecord, action);
        yield put(recordList.get({ page: 0, size: 10, phoneNo: phoneNo },action.status))

    } catch (e) {

    }
}

function* watchAddCollectionRecordList () {
    yield takeEvery(TEL_SALE_LIST_ADD_COLLECTION_RECORD_DATA, addCollectionRecordData);
}


function* getTelSaleListData (action) {
    yield put(telSaleList.loading(true));
    try {
        const res = yield call(getTelSaleList, action);
        const data = res.map(i => ({ ...i, ...i.kycStatusItems }));
        yield put(telSaleList.set(data));
    } catch (e) { }

    yield put(telSaleList.loading(false));
}

function* watchGetTelSaleListData () {
    yield takeEvery(TEL_SALE_LIST['GET'], getTelSaleListData);
}



function* getGuestInfoData (action) {
    try {
        yield fork(getTableData, guestInfo, getGuestInfo, action);
    } catch (e) { }
}

function* watchGetGuestInfoData () {
    yield takeEvery(GUEST_INFO['GET'], getGuestInfoData);
}


function* getUserContactsData (action) {
    try {
        const { data } = yield call(getUserContacts, action.params) || [];
        yield put(userContacts.set(data));
    } catch (e) { }
}

function* watchGetUserContactsData () {
    yield takeEvery(USER_CONTACTS['GET'], getUserContactsData);
}

function* getOverdueCollectionData (action) {
    try {
        yield fork(getTableData, overdueCollection, getOverdueCollection, action);
    } catch (e) { }
}

function* watchGetOverdueCollectionData () {
    yield takeEvery(OVERDUE_COLLECTION['GET'], getOverdueCollectionData);
}



function* getStatisticsList (action) {
    try {
        yield fork(getTableData, statisticsList, getTelSaleStatistics, action);
    } catch (e) { }
}

function* watchGetStatisticsList () {
    yield takeEvery(STATISTICS_LIST['GET'], getStatisticsList);
}


function* getTelSaleCollectorListData (action) {
    try {
        yield fork(getTableData, telSaleCollectorList, getCollectors, action);
    } catch (e) { }
}

function* getTelSaleGroupListData (action) {
  try {
    yield fork(getTableData, telSaleGroupList, getGroups, action);
  } catch (e) { }
}

function* watchGetTelSaleCollectorListData () {
    yield takeEvery(TEL_SALE_COLLECTOR_LIST['GET'], getTelSaleCollectorListData);
}

function* watchGetTelSaleGroupListData() {
  yield takeEvery(TEL_SALE_GROUP_LIST['GET'], getTelSaleGroupListData)
}

export default function* root () {
    yield all([
        fork(watchGetDistributeList),
        fork(watchImportTelSalePhoneNumbers),
        fork(watchDeleteTelSalePhoneNumbers),
        fork(watchGetPersonOrGroupList),
        fork(watchDistributeTelSaleData),
        fork(watchGetCollectionRecordList),
        fork(watchAddCollectionRecordList),
        fork(watchGetTelSaleListData),
        fork(watchGetGuestInfoData),
        fork(watchGetUserContactsData),
        fork(watchGetOverdueCollectionData),
        fork(watchGetStatisticsList),
        fork(watchGetTelSaleCollectorListData),
        fork(watchGetTelSaleGroupListData),
    ])
}
