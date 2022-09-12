import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { 
    CF_GET_SYSTEM_CONFIG_DATA, 
    CF_UPDATE_SYSTEM_CONFIG_DATA,
    cfSetSystemConfigData, 
 } from './actions';
import { configList, updateConfig } from '../api';
import { message } from 'antd';
function* getSystemConfigData() {
    try {
        const res = yield call(configList);
        yield put(cfSetSystemConfigData(res));
    } catch (e) {
    }
}

function* watchGetSystemConfigData() {
    yield takeEvery(CF_GET_SYSTEM_CONFIG_DATA, getSystemConfigData);
}

function* modifySystemConfig(action) {
    try {
        yield call(updateConfig, action.params);
        message.success('操作成功');
        yield call(getSystemConfigData);
    } catch (e) {
        console.log(e);
    }
}
function* watchModifySystemConfig() {
    yield takeEvery(CF_UPDATE_SYSTEM_CONFIG_DATA, modifySystemConfig);
}

export default function* root() {
    yield all([
        fork(watchGetSystemConfigData),
        fork(watchModifySystemConfig)
    ])
}
