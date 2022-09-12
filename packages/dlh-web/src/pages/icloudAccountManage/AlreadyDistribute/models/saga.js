import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {
    ADB_GET_TABLE_DATA,
    adbChangeTableLoading,
    adbSetTableData,
    ADB_SET_NEW_PASSWORD
} from './actions';
import { getICloudList, savePasswrod, getNewPassword } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(adbChangeTableLoading(true));
    try {
        const res = yield call(getICloudList, action.params);
        if (Number(res.code) === 200) {
            console.log(res);
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            }
            yield put(adbSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(adbChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ADB_GET_TABLE_DATA, getTableData);
}

function* setNewPassword(action){
    try {
        const res1 = yield call(getNewPassword, {});
        if(Number(res1.code) === 200) {
            const { data } = res1;
            const newPawd = data['newPawd'];
            const params = {
                icloudId: action.params,
                icloudPwdNew: newPawd
            };
            const res2 = yield call(savePasswrod, params);
            if(Number(res2.code) === 200) {
                message.success('修改成功');
                action.callback && action.callback();
            }
        }
    } catch (e) {

    }
}

function* watchSetNewPassword() {
    yield takeEvery(ADB_SET_NEW_PASSWORD, setNewPassword);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchSetNewPassword)
    ])
}
