import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
  COLLECT_TEAM_MANAGE_PMG_GET_TABLE_DATA,
  pmgChangeModalVisible,
  pmgChangeTableLoading,
  pmgSetTableData,
  COLLECT_TEAM_MANAGE_PMG_ADD_PEOPLE_LIST,
  COLLECT_TEAM_MANAGE_PMG_DEL_PEOPLE_LIST,
  COLLECT_TEAM_MANAGE_PMG_UPDATE_PEOPLE_LIST,
  COLLECT_TEAM_MANAGE_PMG_GET_ROLE_DATA,
  COLLECT_TEAM_MANAGE_PMG_GET_DEPARTMENT_DATA,
  pmgSetDepartmentData,
  pmgSetRoleData,
  COLLECT_TEAM_MANAGE_PMG_GET_COLLECT_TEAM_DATA,
  COLLECT_TEAM_MANAGE_PMG_GET_COLLECT_GROUP_DATA,
  pmgSetCollectTeams,
  pmgSetCollectGroups,
} from './actions';
import { roleList, addPeopleList, delPeopleList, departmentList, peopleList, updatePeopleList, getCollectTeamsList, getCollectGroup } from '../api';

function* getTableData(action) {
    yield put(pmgChangeTableLoading(true));
    try {
        const res = yield call(peopleList, action.params);
        if(Number(res.code) === 200) {
            // const { content } = res;
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(pmgSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(pmgChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_GET_TABLE_DATA, getTableData);
}

//获取角色列表
function* getRoleList(action) {
    try {
        const content = yield call(roleList, action.params);
        yield put(pmgSetRoleData(content))
    } catch (e) {

    }
}
function* watchGetRoleList() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_GET_ROLE_DATA, getRoleList);
}

//获取部门列表
function* getDepartmentList(action) {
    try {
        const content = yield call(departmentList, action.params);
        yield put(pmgSetDepartmentData(content))
    } catch (e) {

    }
}

function* watchGetDepartmentList() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_GET_DEPARTMENT_DATA, getDepartmentList);
}


//添加
function* addPeople(action) {
    try {
        const res = yield call(addPeopleList, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(pmgChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchAddPeople() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_ADD_PEOPLE_LIST, addPeople);
}

function* modifyPeople(action) {
    try {
        const res = yield call(updatePeopleList, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(pmgChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchModifyPeople() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_UPDATE_PEOPLE_LIST, modifyPeople)
}
//删除
function* deletePeople(action) {
    try {
        const res = yield call(delPeopleList, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchDeletePeople() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_DEL_PEOPLE_LIST, deletePeople);
}


function* getCollectTeamsData(action) {
    try{
       const res = yield call(getCollectTeamsList, action.params);
       yield put(pmgSetCollectTeams(res));

    } catch (e) {
        console.log(e);
    }
}

function* watchGetTeamsData() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_GET_COLLECT_TEAM_DATA, getCollectTeamsData);
}

function* getCollectGroupsData(action) {
    try{
        const res = yield call(getCollectGroup, action.teamId);
        const obj = {
            data: res,
            collectTeamId: action.teamId,
            collectGroupId: action.groupId ? action.groupId : ''
        }
        yield put(pmgSetCollectGroups(obj));

    } catch (e) {
        console.log(e);
    }
}

function* watchGetCollectGroupsData() {
    yield takeEvery(COLLECT_TEAM_MANAGE_PMG_GET_COLLECT_GROUP_DATA, getCollectGroupsData);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddPeople),
        fork(watchGetRoleList),
        fork(watchGetDepartmentList),
        fork(watchModifyPeople),
        fork(watchDeletePeople),
        fork(watchGetTeamsData),
        fork(watchGetCollectGroupsData),
    ])
}
