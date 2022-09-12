import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    RLM_GET_TABLE_DATA,
    RLM_GET_MENU_LIST,
    rlmChangeModalVisible,
    rlmChangeTableLoading,
    rlmSetMenuList,
    rlmSetTableData,
    rlmGetTableData,
    RLM_ADD_ROLE_LIST,
    RLM_DEL_ROLE_LIST,
    RLM_UPDATE_ROLE_LIST
} from './actions';
import { roleList, addRoleList, delRoleList, menuList, updateRoleList } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(rlmChangeTableLoading(true));
    try {
        const res = yield call(roleList, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(rlmSetTableData(content || []));
        }
    } catch (e) {

    }

    yield put(rlmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RLM_GET_TABLE_DATA, getTableData);
}

//请求所有菜单
function* getMenuList(action) {
    try {
        const res = yield call(menuList, action.params);
        if(Number(res.code) === 200) {
            let { data: content } = res;
            content = content.map(item => ({ id: item.id, pId: item.parentId, value: item.id + '', label: item.name }));
            content = content.filter(item => item.label !== '菜单管理');
           yield put(rlmSetMenuList(content));
        }
    } catch (e) {

    }
}
function* watchGetMenuList() {
    yield takeEvery(RLM_GET_MENU_LIST, getMenuList);
}

//添加角色
function* addMenuList(action) {
    try {
        const res = yield call(addRoleList, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(rlmChangeModalVisible(false));
            yield put(rlmGetTableData({}));
        }
    } catch (e) {

    }
}
function* watchAddMenuList() {
    yield takeEvery(RLM_ADD_ROLE_LIST, addMenuList);
}

function* modifyRoleList(action) {
    try {
        const res = yield call(updateRoleList, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(rlmChangeModalVisible(false));
            yield put(rlmGetTableData({}));
        }
    } catch (e) {

    }
}
function* watchModifyRoleList() {
    yield takeEvery(RLM_UPDATE_ROLE_LIST, modifyRoleList)
}

//删除角色
function* deleteRoleList(action) {
    try {
        const res = yield call(delRoleList, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            yield put(rlmGetTableData({}));
        }
    } catch (e) {

    }
}

function* watchDeleteRoleList() {
    yield takeEvery(RLM_DEL_ROLE_LIST, deleteRoleList);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetMenuList),
        fork(watchAddMenuList),
        fork(watchDeleteRoleList),
        fork(watchModifyRoleList)
    ])
}
