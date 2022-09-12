import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import { message } from 'antd';
import {
    admSetViewData,
    admSetAdRecordData,
    admTableLoading,
    admSetDisplaySwitch,
    ADM_ADD_ITEM,
    ADM_GET_VIEW_DATA,
    ADM_GET_AD_RECORD_DATA,
    ADM_DELETE_ITEM,
    ADM_UPDATE_ITEM,
    ADM_DISPLAY_SWITCH,
    ADM_ENABLED_SWITCH
} from './actions';
import { addData, getViewData, getAdRecord, deleteData, modifyData, displaySwitch, enabledSwitch } from '../api';


// 获取列表数据
function* getAllData(action) {
    yield put(admTableLoading(true));

    const res = yield call(getViewData, { params: action.params });
    yield put(admSetViewData(res));

    yield put(admTableLoading(false));
}

function* watchGetAllData() {
    yield takeEvery(ADM_GET_VIEW_DATA, getAllData);
}

function* getAdRecordData(action) {
    yield put(admTableLoading(true));

    const res = yield call(getAdRecord, action.params);
    yield put(admSetAdRecordData(res));

    yield put(admTableLoading(false));
}
function* watchGetAdRecordData() {
    yield takeEvery(ADM_GET_AD_RECORD_DATA, getAdRecordData);
}


//添加
function* addItem(action) {
    const res = yield call(addData, action.params);
    if (res instanceof Error) return;

    message.success('添加成功');
    action.callback();
}

function* watchAddItem() {
    yield takeEvery(ADM_ADD_ITEM, addItem);
}

//修改
function* updateItem(action) {
    const res = yield call(modifyData, action.params);
    if (res instanceof Error) return;

    message.success('修改成功');
    action.callback();
}

function* watchUpdateItem() {
    yield takeEvery(ADM_UPDATE_ITEM, updateItem);
}

//删除
function* deleteItem(action) {
    const res = yield call(deleteData, action.params);
    if (res instanceof Error) return;

    message.success('删除成功');
    action.callback();
}

function* watchDeleteItem() {
    yield takeEvery(ADM_DELETE_ITEM, deleteItem);
}

// 是否顯示廣告
function* admDisplaySwitch(action) {
    const res = yield call(displaySwitch, action.params); // { enabled: xxx }
    if (res instanceof Error) return;

    message.success('操作成功');
    yield put(admSetDisplaySwitch(action.params.enabled));
}

function* watchDisplaySwitch() {
    yield takeEvery(ADM_DISPLAY_SWITCH, admDisplaySwitch);
}

// 廣告啟用開關
function* admEnabledSwitch(action) {
    const res = yield call(enabledSwitch, action.params);
    if (res instanceof Error) return;

    message.success('操作成功');
    action.callback();
}

function* watchEnabledSwitch() {
    yield takeEvery(ADM_ENABLED_SWITCH, admEnabledSwitch);
}

export default function* root() {
    yield all([
        fork(watchAddItem),
        fork(watchGetAllData),
        fork(watchGetAdRecordData),
        fork(watchDeleteItem),
        fork(watchUpdateItem),
        fork(watchDisplaySwitch),
        fork(watchEnabledSwitch)
    ])
}
