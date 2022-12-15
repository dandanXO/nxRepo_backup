import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { SETTLE_MCH_ADD_TABLE_DATA, SETTLE_MCH_DELETE_MODEL, SETTLE_MCH_GET_TABLE_DATA, SETTLE_MCH_TOGGLE_ENABLED, SETTLE_MCH_UPDATE_TABLE_DATA, settleMchChangeModalVisible, settleMchChangeTableLoading, settleMchGetTableData, settleMchSetTableData, } from './actions';
import { addModel, deleteModelByIds, getModelList, updateModel, toggleEnabled } from '../api';


function* getTableData(action) {
    yield put(settleMchChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
        const { records } = res;
        const obj = {
            data: records || [],
            pagination: {
                total: res.totalPage,
                current: res.currentPage
            }
        }
        yield put(settleMchSetTableData(obj));

    } catch (e) {

    }
    yield put(settleMchChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(SETTLE_MCH_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleMchChangeModalVisible(false));
            yield put(settleMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(SETTLE_MCH_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleMchChangeModalVisible(false));
            yield put(settleMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(SETTLE_MCH_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(settleMchChangeModalVisible(false));
            yield put(settleMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(SETTLE_MCH_DELETE_MODEL, deleteModel);
}

function* toggleMchEnabled(action) {
    try {
        const res = yield call(toggleEnabled, action.params);
        if (res.code === '200') {
            message.success('操作成功');
            yield put(settleMchChangeModalVisible(false));
            yield put(settleMchGetTableData({ pageSize: 50, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchToggleMchEnabled() {
    yield takeEvery(SETTLE_MCH_TOGGLE_ENABLED, toggleMchEnabled);
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
