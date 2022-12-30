import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {Checkbox, message} from 'antd';
import {
  TOOD_GET_TABLE_DATA,
  toodSetTableData,
  toodChangeTableLoading,
  TOOD_DISTRIBUTE_ORDER,
  toodChangeModalVisible,
  toodChangeSelectKey,
  TOOD_GET_TODAY_COLLECTOR,
  toodSetTodayCollector,
} from './actions';
import {getOrderListData, distributeOrder, getTodayCollector} from '../api';
import React from "react";


//获取列表数据
function* getTableData(action) {
    yield put(toodChangeTableLoading(true));
    try{
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(toodSetTableData(obj));
            //请求列表数据后将选中的行制空
            yield put(toodChangeSelectKey([]));
        }
    } catch (e) {

    }

    yield put(toodChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TOOD_GET_TABLE_DATA, getTableData);
}

//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(toodChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(TOOD_DISTRIBUTE_ORDER, distributeData);
}


function* getTodayCollectorSaga() {
  try {
    const response = yield call(getTodayCollector);
    yield put(toodSetTodayCollector(response));

    } catch (e) {
      console.log(e);
  }
}
function* watchGetTodayCollector() {
  yield  takeEvery(TOOD_GET_TODAY_COLLECTOR, getTodayCollectorSaga)
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchDistributeData),
        fork(watchGetTodayCollector),
    ])
}
