import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  TODL_GET_TABLE_DATA,
  todlSetTableData,
  todlChangeTableLoading,
  TODL_GET_PERSON,
  todlSetPerson,
  TODL_DISTRIBUTE_ORDER,
  todlChangeModalVisible,
  todlChangeSelectKey,
  todlChangePersonType,
  TODL_COLLECTOR_GET_MODAL_DATA,
  todlColleterChangeModalVisible,
  todlColleterChangeModalLoading,
  todlColletorSetModalData,
  TODL_GET_TODAY_COLLECTOR,
  todlSetTodayCollector,
  TODL_GET_COLLECTOR_LIST,
  todlSetCollectorList,
  TODL_GET_PRODUCT_SELECT,
  todlSetProductSelect
} from './actions';
import { getOrderListData, getUrgePersonData, distributeOrder, collectorGetDetail, getCollectorList, getProductList } from '../api';
import {message} from "antd";
import {getTodayCollector} from "../../TodayOrderDistribute/api";

function* getTableData (action) {
    yield put(todlChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        const obj = {
            data: res.records || [],
            pagination: {
                total: res.totalRecords,
                current: res.currentPage
            }
        };
        yield put(todlSetTableData(obj));
        yield put(todlChangeSelectKey([]));
    } catch (e) {

    }
    yield put(todlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TODL_GET_TABLE_DATA, getTableData);
}

//获取催收人
function* getPerson(action) {
    try{
        const res = yield call(getUrgePersonData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            const isGroup = content['type'] === 'group';
            const data = isGroup ? content['departmentList'] : content['mssAdminUserList'];
            const personData = data.map(item => ({ name: isGroup ? item['name'] : item.trueName, value: item.id }));
            yield put(todlChangePersonType(content['type']));
            yield put(todlSetPerson(personData));
            action.callback && action.callback();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetPerson() {
    yield takeEvery(TODL_GET_PERSON, getPerson);
}

//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(todlChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(TODL_DISTRIBUTE_ORDER, distributeData);
}
//產品列表下拉
function* getProductData(action) {
    try {
        const res = yield call(getProductList, action.params);
        yield put(todlSetProductSelect(res));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetProductData() {
    yield takeEvery(TODL_GET_PRODUCT_SELECT, getProductData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData),
        fork(watchCollectorGetDetail),
        fork(watchGetTodayCollector),
        fork(watchGetCollectorList),
        fork(watchGetProductData)
    ])
}

function* watchCollectorGetDetail() {
  yield takeEvery(TODL_COLLECTOR_GET_MODAL_DATA, getCollectorDetail);
}

function* getCollectorDetail(action) {
  yield put(todlColleterChangeModalVisible(true));
  yield put(todlColleterChangeModalLoading(true));
  try{
    console.log("action", action);
    const res = yield call(collectorGetDetail, action.params);
    yield put(todlColletorSetModalData(res));
  } catch (e) {
    console.log(e);
  }
  yield put(todlColleterChangeModalLoading(false));
}

function* watchGetTodayCollector() {
  yield  takeEvery(TODL_GET_TODAY_COLLECTOR, getTodayCollectorSaga)
}

function* getTodayCollectorSaga() {
  try {
    const response = yield call(getTodayCollector);
    yield put(todlSetTodayCollector(response));

  } catch (e) {
    console.log(e);
  }
}



function* watchGetCollectorList() {
  yield  takeEvery(TODL_GET_COLLECTOR_LIST, getCollectorListSaga)
}

function* getCollectorListSaga() {
  try {
    const response = yield call(getCollectorList);
    console.log("list:", response)
    yield put(todlSetCollectorList(response));

  } catch (e) {
    console.log(e);
  }
}
