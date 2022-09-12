import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_PLAT_GET_TABLE_DATA,
    payPlatChangeTableLoading,
    payPlatSetTableData,
    payPlatGetTableData,
    payPlatChangeModalVisible,
    PAY_PLAT_ADD_TABLE_DATA,
    PAY_PLAT_UPDATE_TABLE_DATA,
    PAY_PLAT_DELETE_MODEL
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds } from '../api';


function* getTableData(action) {
    yield put(payPlatChangeTableLoading(true));
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
            yield put(payPlatSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(payPlatChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PAY_PLAT_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payPlatChangeModalVisible(false));
            yield put(payPlatGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(PAY_PLAT_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payPlatChangeModalVisible(false));
            yield put(payPlatGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(PAY_PLAT_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payPlatChangeModalVisible(false));
            yield put(payPlatGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(PAY_PLAT_DELETE_MODEL, deleteModel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel)
    ])
}
