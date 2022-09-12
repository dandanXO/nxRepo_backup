import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    DTM_GET_TABLE_DATA,
    DTM_ADD_TABLE_DATA,
    DTM_UPDATE_TABLE_DATA,
    DTM_DEL_TABLE_DATA,
    dtmSetTableData,
    dtmChangeModalVisible,
    dtmChangeTableLoading,
    DTM_GET_PERSON_DATA,
    dtmGetTableData,
    dtmSetPersonData
} from './actions';
import { departmentList, addDepartment, delDepartment, updateDepartment, personData } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(dtmChangeTableLoading(true));
    try {
        const res = yield call(departmentList, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(dtmSetTableData(content || []));
        }
    } catch (e) {

    }

    yield put(dtmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(DTM_GET_TABLE_DATA, getTableData);
}
//获取负责人数据
function* getPersonData(action) {
    try{
        const res = yield call(personData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(dtmSetPersonData(content));
        }
    } catch (e) {

    }
}
function* watchGetPersonData() {
    yield takeEvery(DTM_GET_PERSON_DATA, getPersonData);
}
//添加部门
function* addDepartmentData(action) {
    try {
        const res = yield call(addDepartment, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(dtmChangeModalVisible(false));
            yield put(dtmGetTableData({}));
        }
    } catch (e) {

    }
}
function* watchAddDepartmentData(){
    yield takeEvery(DTM_ADD_TABLE_DATA, addDepartmentData)
}

function* updateDepartmentData(action) {
    try {
        const res = yield call(updateDepartment, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(dtmChangeModalVisible(false));
            yield put(dtmGetTableData({}));
        }
    } catch (e) {

    }
}

function* watchUpdateDepartmentData() {
    yield takeEvery(DTM_UPDATE_TABLE_DATA, updateDepartmentData);
}

function* deleteDepartmentData(action) {
    try {
        const res = yield call(delDepartment, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            yield put(dtmGetTableData({}));
        }
    } catch (e) {

    }
}

function* watchDeleteDepartmentData() {
    yield takeEvery(DTM_DEL_TABLE_DATA, deleteDepartmentData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPersonData),
        fork(watchAddDepartmentData),
        fork(watchUpdateDepartmentData),
        fork(watchDeleteDepartmentData)
    ])
}
