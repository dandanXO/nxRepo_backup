import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { chlUChangeTableLoading, chlUSetTableData, CHL_U_GET_TABLE_DATA, CHL_U_ADD_TABLE_DATA, chlUChangeModalVisible, chlUGetTableData, CHL_U_UPDATE_TABLE_DATA, CHL_U_GET_CHANNEL_DATA, chalUSetChannelData } from './actions';
import { getChannelUserListData, updateChannelUserList, addChannelUserList } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(chlUChangeTableLoading(true));
    try {
        const res = yield call(getChannelUserListData, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(chlUSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(chlUChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CHL_U_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannelUser(action) {
    try{
        const res = yield call(addChannelUserList, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(chlUChangeModalVisible(false));
            yield put(chlUGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannelUser() {
    yield takeEvery(CHL_U_ADD_TABLE_DATA, addChannelUser);
}

function* modifyChannelUser(action) {
    try {
        const res = yield call(updateChannelUserList, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(chlUChangeModalVisible(false));
            yield put(chlUGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannelUser() {
    yield takeEvery(CHL_U_UPDATE_TABLE_DATA, modifyChannelUser);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannelUser),
        fork(watchModifyChannelUser)
    ])
}
