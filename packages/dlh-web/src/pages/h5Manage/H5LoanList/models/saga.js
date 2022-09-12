import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import { message } from 'antd';
import {
    HLL_GET_UPLOAD_TOKEN,
    hllSetUploadFile,
    HLL_ADD_ITEM,
    hllChangeModalVisible,
    HLL_GET_TABLE_DATA,
    hllSetTableData,
    hllGetTableData,
    HLL_SORT_DATA,
    HLL_DELETE_DATA,
    HLL_UPDATE_ITEM
} from './actions';
import { getUploadToken, addItem, getTableData, sortData, deleteData, modifyData } from '../api';
import { axios } from 'utils';

//获取token
function* getToken(action) {
    try{
        const res = yield call(getUploadToken, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            const obj = {
                key: content['fileName'],
                token: content['uploadToken']
            };
            yield put(hllSetUploadFile(obj));
        }
    } catch (e) {
        console.log(e);
    }

}

function* watchGetToken() {
    yield takeEvery(HLL_GET_UPLOAD_TOKEN, getToken);
}

//添加
function* addListItem(action) {
    try {
        const res = yield call(addItem, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(hllChangeModalVisible(false));
            yield put(hllGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddListItem() {
    yield takeEvery(HLL_ADD_ITEM, addListItem);
}

//修改
function* updateItem(action) {
    try {
        const res = yield call(modifyData, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(hllChangeModalVisible(false));
            yield put(hllGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchUpdateItem() {
    yield takeEvery(HLL_UPDATE_ITEM, updateItem);
}

//获取列表数据
function* getAllData(action) {
    try {
        const res = yield call(getTableData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(hllSetTableData(content));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetAllData() {
    yield takeEvery(HLL_GET_TABLE_DATA, getAllData);
}
//排序
function* sortAllData(action) {
    try {
        const res = yield call(sortData, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {
        console.log(e)
    }
}
function* watchSortAllData() {
    yield takeEvery(HLL_SORT_DATA, sortAllData);
}

//删除
function* deleteItem(action) {
    try {
        const res = yield call(deleteData, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            //重新请求数据
            yield put(hllGetTableData({}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDeleteItem() {
    yield takeEvery(HLL_DELETE_DATA, deleteItem);
}

export default function* root() {
    yield all([
        fork(watchGetToken),
        fork(watchAddListItem),
        fork(watchGetAllData),
        fork(watchSortAllData),
        fork(watchDeleteItem),
        fork(watchUpdateItem)
    ])
}
