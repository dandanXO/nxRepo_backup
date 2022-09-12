import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    SITE_BLACK_GET_TABLE_DATA,
    siteBlackChangeModalVisible,
    siteBlackChangeTableLoading,
    siteBlackSetTableData,
    SITE_BLACK_ADD_LIST,
    SITE_BLACK_DEL_LIST,
    SITE_BLACK_UPDATE_LIST
} from './actions';
import { addSiteBlackList, delSiteBlackList, siteBlackList, updateSiteBlackList} from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(siteBlackChangeTableLoading(true));
    try {
        const res = yield call(siteBlackList, action.params);
        if(Number(res.code) === 200) {
            console.info(res);
            const obj = {
                data: res.data.records || [],
                pagination: {
                    total: res.data.totalRecords,
                    current: res.data.currentPage
                }
            };
            yield put(siteBlackSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(siteBlackChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(SITE_BLACK_GET_TABLE_DATA, getTableData);
}



//添加
function* addSiteBlack(action) {
    try {
        const res = yield call(addSiteBlackList, action.params);
        if(Number(res.code) === 200) {
            message.success('添加成功');
            yield put(siteBlackChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchAddSiteBlack() {
    yield takeEvery(SITE_BLACK_ADD_LIST, addSiteBlack);
}

function* modifySiteBlack(action) {
    try {
        const res = yield call(updateSiteBlackList, action.params);
        if(Number(res.code) === 200) {
            message.success('修改成功');
            yield put(siteBlackChangeModalVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchModifySiteBlack() {
    yield takeEvery(SITE_BLACK_UPDATE_LIST, modifySiteBlack)
}
//删除
function* deleteSiteBlack(action) {
    try {
        const res = yield call(delSiteBlackList, action.params);
        if(Number(res.code) === 200) {
            message.success('删除成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}

function* watchDeleteSiteBlack() {
    yield takeEvery(SITE_BLACK_DEL_LIST, deleteSiteBlack);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddSiteBlack),
        fork(watchModifySiteBlack),
        fork(watchDeleteSiteBlack)
    ])
}
