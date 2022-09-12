import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    SETTLE_MANUAL_ORDER_GET_TABLE_DATA,
    settleManualOrderChangeTableLoading,
    settleManualOrderSetTableData,
    settleManualOrderGetTableData,
    settleManualOrderChangeModalVisible,
    SETTLE_MANUAL_ORDER_ADD_TABLE_DATA,
    SETTLE_MANUAL_ORDER_UPDATE_TABLE_DATA,
    SETTLE_MANUAL_ORDER_DELETE_MODEL
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds } from '../api';


function* getTableData(action) {
    yield put(settleManualOrderChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
        if (res.code === '200') {
            const {data} = res;
            const obj = {
                data: data.content || [],
                pagination: {
                    total: data.total,
                    current: data.pageNumber
                }
            }
            yield put(settleManualOrderSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(settleManualOrderChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(SETTLE_MANUAL_ORDER_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleManualOrderChangeModalVisible(false));
            yield put(settleManualOrderGetTableData({ orderType:action.params.orderType ,pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(SETTLE_MANUAL_ORDER_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleManualOrderChangeModalVisible(false));
            yield put(settleManualOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(SETTLE_MANUAL_ORDER_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleManualOrderChangeModalVisible(false));
            yield put(settleManualOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(SETTLE_MANUAL_ORDER_DELETE_MODEL, deleteModel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel)
    ])
}
