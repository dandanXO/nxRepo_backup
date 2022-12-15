import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_MCH_GET_TABLE_DATA,
    payMchChangeTableLoading,
    payMchSetTableData,
    payMchGetTableData,
    payMchChangeModalVisible,
    PAY_MCH_ADD_TABLE_DATA,
    PAY_MCH_UPDATE_TABLE_DATA,
    PAY_MCH_DELETE_MODEL,
    PAY_MCH_TOGGLE_ENABLED
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds, toggleEnabled } from '../api';

function* getTableData(action) {
    yield put(payMchChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
        const {records} = res;
        const obj = {
          data: records || [],
          pagination: {
            total: res.totalPage,
            current: res.currentPage
          }
        }
        yield put(payMchSetTableData(obj));
    } catch (e) {

    }
    yield put(payMchChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PAY_MCH_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payMchChangeModalVisible(false));
            yield put(payMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(PAY_MCH_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payMchChangeModalVisible(false));
            yield put(payMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(PAY_MCH_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payMchChangeModalVisible(false));
            yield put(payMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(PAY_MCH_DELETE_MODEL, deleteModel);
}

function* toggleMchEnabled(action) {
    try {
        const res = yield call(toggleEnabled, action.params);
        if (res.code === '200') {
            message.success('操作成功');
            yield put(payMchChangeModalVisible(false));
            yield put(payMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchToggleMchEnabled() {
    yield takeEvery(PAY_MCH_TOGGLE_ENABLED, toggleMchEnabled);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel),
        fork(watchToggleMchEnabled),
    ])
}
