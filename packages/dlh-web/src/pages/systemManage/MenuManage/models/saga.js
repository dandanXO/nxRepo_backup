import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import {
    MMG_GET_TABLE_DATA,
    MMG_ADD_TREE_DATA,
    MMG_UPDATE_TREE_DATA,
    MMG_DEL_TREE_DATA,
    mmgSetTableData,
    mmgChangeTableLoading,
    mmgChangeModalVisible,
    mmgGetTableData
} from './actions';
import { message } from 'antd';
import { getTreeList, postUpdateTree, postDelTree, postAddTree } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(mmgChangeTableLoading(true));
    try{
        const res = yield call(getTreeList, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            console.log(res);
            yield put(mmgSetTableData(content || []));
        }
    } catch (e) {
        console.log(e);
    }

    yield put(mmgChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(MMG_GET_TABLE_DATA, getTableData);
}

function* addTreeListData(action){
    try {
        const res = yield call(postAddTree, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(mmgChangeModalVisible(false));
            yield put(mmgGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddTreeListData(){
    yield takeEvery(MMG_ADD_TREE_DATA, addTreeListData);
}

function* updateTreeListData(action) {
    try {
        const res = yield call(postUpdateTree, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(mmgChangeModalVisible(false));
            yield put(mmgGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchUpdateTreeListData() {
    yield takeEvery(MMG_UPDATE_TREE_DATA, updateTreeListData);
}

function* deleteTreeListData(action) {
    try {
        const res = yield call(postDelTree, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            yield put(mmgGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDeleteTreeListData() {
    yield takeEvery(MMG_DEL_TREE_DATA, deleteTreeListData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddTreeListData),
        fork(watchUpdateTreeListData),
        fork(watchDeleteTreeListData)
    ])
}
