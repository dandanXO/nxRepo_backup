import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    CHL_GET_TABLE_DATA,
    chlChangeTableLoading,
    chlSetTableData,
    chlGetTableData,
    chlChangeModalVisible,
    CHL_ADD_TABLE_DATA,
    CHL_UPDATE_TABLE_DATA,
    CHL_GET_ROLE_DATA,
    chlSetRoleData
} from './actions';
import {roleList, getChannelListData, addChannelList, updateChannelList } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(chlChangeTableLoading(true));
    try {
        const res = yield call(getChannelListData, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(chlSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(chlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CHL_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addChannelList, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(chlChangeModalVisible(false));
            yield put(chlGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(CHL_ADD_TABLE_DATA, addChannel);
}

//获取角色数据
function* getRoleList(action) {
    try {
        const res = yield call(roleList, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(chlSetRoleData(content))
        }
    } catch (e) {

    }
}
function* watchGetRoleList() {
    yield takeEvery(CHL_GET_ROLE_DATA, getRoleList);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateChannelList, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(chlChangeModalVisible(false));
            yield put(chlGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(CHL_UPDATE_TABLE_DATA, modifyChannel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchGetRoleList)
    ])
}
