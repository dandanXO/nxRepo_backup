import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import {
    GET_COLLECT_TEAM_DATA,
    ADD_COLLECT_TEAM,
    UPDATE_COLLECT_TEAM,
    DELETE_COLLECT_TEAM,
    GET_COLLECT_GROUP_DATA,
    ADD_COLLECT_GROUP,
    UPDATE_COLLECT_GROUP,
    DELETE_COLLECT_GROUP,
    setCollectTeam,
    setCollectGroup
} from './actions';
import { message } from 'antd';
import { getCollectTeamsList, addCollectTeam, updateCollectTeam, deleteCollectTeam, getCollectGroup, addCollectGroup, updateCollectGroup, deleteCollectGroup } from '../api';


function* getTableData(action) {
    try{
       const res = yield call(getCollectTeamsList, action.params);
       yield put(setCollectTeam(res));
    } catch (e) {
        console.log(e);
    }
}

function* watchGetTableData() {
    yield takeEvery(GET_COLLECT_TEAM_DATA, getTableData);
}

function* addCollectTeamData(action) {
    try{
        yield call(addCollectTeam, action.params);
        yield getTableData(action)
    } catch (e) {
        console.log(e);
    }
}

function* watchAddCollectTeam() {
    yield takeEvery(ADD_COLLECT_TEAM, addCollectTeamData);
}


function* modifyTeam(action) {
    try {
        yield call(updateCollectTeam, action.params);
        message.success('操作成功');
        yield getTableData(action)

    } catch (e) {
        console.log(e);
    }
}

function* watchModifyTeam() {
    yield takeEvery(UPDATE_COLLECT_TEAM, modifyTeam);
}


function* deleteTeam(action) {
    try {
        yield call(deleteCollectTeam, action.params);
        message.success('操作成功');
        yield getTableData(action)

    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteTeam() {
    yield takeEvery(DELETE_COLLECT_TEAM, deleteTeam);
}

function* getCollectGroupData(action) {
    try{
        const res = yield call(getCollectGroup, action.params);
        yield put(setCollectGroup(res));

    } catch (e) {
        console.log(e);
    }
}

function* watchGetGroupData() {
    yield takeEvery(GET_COLLECT_GROUP_DATA, getCollectGroupData);
}

function* addCollectGroupData(action) {
    try{
        yield call(addCollectGroup, action.params);
        yield getTableData(action)

    } catch (e) {
        console.log(e);
    }
}

function* watchAddGroupData() {
    yield takeEvery(ADD_COLLECT_GROUP, addCollectGroupData);
}


function* updateCollectGroupData(action) {
    try{
        yield call(updateCollectGroup, action.params);
        yield getTableData(action)
    } catch (e) {
        console.log(e);
    }
}

function* watchUpdateGroupData() {
    yield takeEvery(UPDATE_COLLECT_GROUP, updateCollectGroupData);
}

function* deleteCollectGroupData(action) {
    try{
        yield call(deleteCollectGroup, action.params);
        yield getTableData(action)

    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteGroupData() {
    yield takeEvery(DELETE_COLLECT_GROUP, deleteCollectGroupData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddCollectTeam),
        fork(watchModifyTeam),
        fork(watchDeleteTeam),
        fork(watchAddGroupData),
        fork(watchGetGroupData),
        fork(watchUpdateGroupData),
        fork(watchDeleteGroupData),
    ])
}
