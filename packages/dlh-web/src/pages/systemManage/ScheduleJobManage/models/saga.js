import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    SJ_GET_TABLE_DATA,
    sjChangeModalVisible,
    sjChangeTableLoading,
    sjSetTableData,
    SJ_ADD_SCHEDULE_JOB_LIST,
    SJ_DEL_SCHEDULE_JOB_LIST,
    SJ_UPDATE_SCHEDULE_JOB_LIST,
    SJ_EXECUTE_SCHEDULE_JOB
} from './actions';
import { addScheduleJobList, delScheduleJobList, scheduleJobList, updateScheduleJobList, executeScheduleJobList } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(sjChangeTableLoading(true));
    try {
        const res = yield call(scheduleJobList, action.params);
        if(Number(res.code) === 200) {
            console.info(res);
            const obj = {
                data: res.data.records || [],
                pagination: {
                    total: res.data.totalRecords,
                    current: res.data.currentPage
                }
            };
            yield put(sjSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(sjChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(SJ_GET_TABLE_DATA, getTableData);
}



//添加
function* addScheduleJob(action) {
    try {
        const res = yield call(addScheduleJobList, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(sjChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchAddScheduleJob() {
    yield takeEvery(SJ_ADD_SCHEDULE_JOB_LIST, addScheduleJob);
}

function* modifyScheduleJob(action) {
    try {
        const res = yield call(updateScheduleJobList, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(sjChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchModifyScheduleJob() {
    yield takeEvery(SJ_UPDATE_SCHEDULE_JOB_LIST, modifyScheduleJob)
}
//删除
function* deleteScheduleJob(action) {
    try {
        const res = yield call(delScheduleJobList, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchDeleteScheduleJob() {
    yield takeEvery(SJ_DEL_SCHEDULE_JOB_LIST, deleteScheduleJob);
}


//立即执行
function* executeScheduleJob(action) {
    try {
        const res = yield call(executeScheduleJobList, action.params);
        if(Number(res.code) === 200) {
            message.success('执行成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchExecuteScheduleJob() {
    yield takeEvery(SJ_EXECUTE_SCHEDULE_JOB, executeScheduleJob);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddScheduleJob),
        fork(watchModifyScheduleJob),
        fork(watchDeleteScheduleJob),
        fork(watchExecuteScheduleJob)
    ])
}
