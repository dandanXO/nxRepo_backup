import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_ORDER_GET_TABLE_DATA,
    payOrderChangeTableLoading,
    payOrderSetTableData,
    payOrderGetTableData,
    payOrderChangeModalVisible,
    PAY_ORDER_ADD_TABLE_DATA,
    PAY_ORDER_UPDATE_TABLE_DATA,
    PAY_ORDER_DELETE_MODEL
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds } from '../api';


function* getTableData (action) {
    yield put(payOrderChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
    
        const obj = {
            data: res.records || [],
            pagination: {
                total: res.totalRecords,
                current: res.records.length === 0 ? 0 : res.currentPage,
            }
        }
        yield put(payOrderSetTableData(obj));

    } catch (e) {

    }
    yield put(payOrderChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PAY_ORDER_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payOrderChangeModalVisible(false));
            yield put(payOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(PAY_ORDER_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payOrderChangeModalVisible(false));
            yield put(payOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(PAY_ORDER_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payOrderChangeModalVisible(false));
            yield put(payOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(PAY_ORDER_DELETE_MODEL, deleteModel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel)
    ])
}
