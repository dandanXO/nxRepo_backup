import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    GET_RECALL_SETTING_DATA,
    GET_RECALL_CONDITIONS_DATA,
    ADD_RECALL_SETTING,
    UPDATE_RECALL_SETTING,
    UPDATE_RECALL_SETTING_ENABLE,
    DELETE_RECALL_SETTING,
    getRecallSetting,
    setRecallSetting,
    setRecallConditions,
    ChangeRecallSettingTableLoading,
} from './actions';
import {
    getRecallSettingList,
    addRecallSetting,
    updateRecallSetting,
    deleteRecallSetting,
    getRecallConditionsList,
    updateRecallSettingEnable
} from "../api";
import { axios } from 'utils';

function* getTableData (action) {
    yield put(ChangeRecallSettingTableLoading(true));
    try {
        const res = yield call(getRecallSettingList, action.params);
        yield put(setRecallSetting(res));
    } catch (e) {
    }
    yield put(ChangeRecallSettingTableLoading(false));
}

function* watchGetTableData () {
    yield takeEvery(GET_RECALL_SETTING_DATA, getTableData);
}

//获取召回條件代號
function* getRecallConditionsData (action) {
    try {
        const res = yield call(getRecallConditionsList, action.params);
        yield put(setRecallConditions(res))

    } catch (e) {

    }
}
function* watchRecallConditionsData () {
    yield takeEvery(GET_RECALL_CONDITIONS_DATA, getRecallConditionsData);
}

//添加
function* addRecallSettingList (action) {
    try {
        yield call(addRecallSetting, action.params);
        yield put(getRecallSetting(action));
    } catch (e) {
    }
}
function* watchAddRecallSetting () {
    yield takeEvery(ADD_RECALL_SETTING, addRecallSettingList);
}

function* modifyRecallSetting (action) {
    try {
        yield call(updateRecallSetting, action.params);
      
        message.success('修改成功');

        yield put(getRecallSetting(action));
    } catch (e) {

    }
}
function* watchModifyRecallSetting () {
    yield takeEvery(UPDATE_RECALL_SETTING, modifyRecallSetting)
}

function* modifyRecallSettingEnable (action) {
    try {
        yield call(updateRecallSettingEnable, action.params);  
        message.success('修改成功');
        yield put(getRecallSetting(action));
    } catch (e) {

    }
}
function* watchModifyRecallSettingEnable () {
    yield takeEvery(UPDATE_RECALL_SETTING_ENABLE, modifyRecallSettingEnable)
}
//删除
function* deleteRecallSettingData (action) {
    try {
        yield call(deleteRecallSetting, action.params);
        message.success('删除成功');
        yield put(getRecallSetting(action));
    } catch (e) {

    }
}

function* watchDeleteRecallSetting () {
    yield takeEvery(DELETE_RECALL_SETTING, deleteRecallSettingData);
}

export default function* root () {
    yield all([
        fork(watchGetTableData),
        fork(watchRecallConditionsData),
        fork(watchAddRecallSetting),
        fork(watchModifyRecallSetting),
        fork(watchModifyRecallSettingEnable),
        fork(watchDeleteRecallSetting),
    ])
}
