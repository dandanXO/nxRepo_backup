import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_COMM_BANK_GET_TABLE_DATA,
    payCommBankChangeTableLoading,
    payCommBankSetTableData,
    payCommBankGetTableData,
    payCommBankChangeModalVisible,
    PAY_COMM_BANK_ADD_TABLE_DATA,
    PAY_COMM_BANK_UPDATE_TABLE_DATA,
    PAY_COMM_BANK_DELETE_MODEL
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds } from '../api';


function* getTableData(action) {
    yield put(payCommBankChangeTableLoading(true));
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
            yield put(payCommBankSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(payCommBankChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PAY_COMM_BANK_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payCommBankChangeModalVisible(false));
            yield put(payCommBankGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(PAY_COMM_BANK_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payCommBankChangeModalVisible(false));
            yield put(payCommBankGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(PAY_COMM_BANK_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payCommBankChangeModalVisible(false));
            yield put(payCommBankGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(PAY_COMM_BANK_DELETE_MODEL, deleteModel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel)
    ])
}
