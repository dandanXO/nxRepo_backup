import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  ODL_GET_TABLE_DATA,
  odlSetTableData,
  odlChangeTableLoading,
  ODL_GET_PERSON,
  odlSetPerson,
  ODL_GET_COLLECTOR_SELECT,
  odlSetCollectorSelect,
  ODL_DISTRIBUTE_ORDER,
  odlChangeModalVisible,
  odlChangeSelectKey,
  odlColleterChangeModalLoading,
  odlColleterChangeModalVisible,
  odlColletorSetModalData,
  ODL_COLLECTOR_GET_MODAL_DATA,
  ODL_GET_PRODUCT_SELECT,
  odlSetProductSelect,
  ODL_GET_STAGE_SELECT,
  odlSetStageSelect
} from './actions';
import { getOrderListData, getOverdueCollectorStageData, getOverdueCollectorData, distributeOrder, collectorGetDetail, getProductList ,getOverdueStageList} from '../api';
import {message} from "antd";

function* getTableData(action) {
    yield put(odlChangeTableLoading(true));
    try{
        const res = yield call(getOrderListData, action.params);
 
            const obj = {
                data: res.records || [],
                pagination: {
                    total: res.totalRecords,
                    current: res.currentPage
                }
            };
            yield put(odlSetTableData(obj));
            yield put(odlChangeSelectKey([]));

    } catch (e) {

    }
    yield put(odlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ODL_GET_TABLE_DATA, getTableData);
}

// 获取催收阶段的催收员(依照催收階段)
function* getPerson(action) {
    try{
        const res = yield call(getOverdueCollectorStageData, action.params);
        yield put(odlSetPerson(res));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetPerson() {
    yield takeEvery(ODL_GET_PERSON, getPerson);
}


// 获取催收阶段的催收员(下拉選單)
function* getCollectorSelect(action) {
    try{
        const res = yield call(getOverdueCollectorData);
        yield put(odlSetCollectorSelect(res));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetCollectorSelect() {
    yield takeEvery(ODL_GET_COLLECTOR_SELECT, getCollectorSelect);
}

//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(odlChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(ODL_DISTRIBUTE_ORDER, distributeData);
}

//產品列表下拉
function* getProductData(action) {
    try {
        const res = yield call(getProductList, action.params);
        yield put(odlSetProductSelect(res));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetProductData() {
    yield takeEvery(ODL_GET_PRODUCT_SELECT, getProductData);
}


// 催收階段下拉
function* getStageSelect(action) {
    try{
        const res = yield call(getOverdueStageList);
        yield put(odlSetStageSelect(res));
    } catch (e) {
        console.log(e);
    }
}
function* watchGetStageSelect() {
    yield takeEvery(ODL_GET_STAGE_SELECT, getStageSelect);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData),
        fork(watchCollectorGetDetail),
        fork(watchGetCollectorSelect),
        fork(watchGetProductData),
        fork(watchGetStageSelect)
    ])
}


function* watchCollectorGetDetail() {
  yield takeEvery(ODL_COLLECTOR_GET_MODAL_DATA, getCollectorDetail);
}

function* getCollectorDetail(action) {
  yield put(odlColleterChangeModalVisible(true));
  yield put(odlColleterChangeModalLoading(true));
  try{
    console.log("action", action);
    const res = yield call(collectorGetDetail, action.params);
    yield put(odlColletorSetModalData(res));
  } catch (e) {
    console.log(e);
  }
  yield put(odlColleterChangeModalLoading(false));
}

