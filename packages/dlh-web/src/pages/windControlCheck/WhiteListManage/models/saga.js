import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { 
    WLM_GET_TABLE_DATA,
    wlmChangeTableLoading,
    wlmSetTableData, 
    wlmChangeModalVisible,
     wlmGetTableData, 
     WLM_ADD_TABLE_DATA,
     WLM_UPDATE_TABLE_DATA
} from './actions';
import { getWhiteListManageData, updateWhiteList, addWhiteList } from '../api';
import { message } from 'antd';


function* getTableData(action) {
    yield put(wlmChangeTableLoading(true));
    try{
        const res = yield call(getWhiteListManageData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(wlmSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(wlmChangeTableLoading(false));
}


function* watchGetTableData() {
    yield takeEvery(WLM_GET_TABLE_DATA, getTableData);
}

function* addWhite(action) {
    try{
        const res = yield call(addWhiteList, action.params);
        // do callback when response
        action.callback();

        if(Number(res.code) === 200) {
            // message.success(res.data);
            message.success(res.data, 5, "");
            yield put(wlmChangeModalVisible(false));
            yield put(wlmGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchAddWhite() {
    yield takeEvery(WLM_ADD_TABLE_DATA, addWhite);
}

function* modifyWhite(action) {
    try {
        const res = yield call(updateWhiteList, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(wlmChangeModalVisible(false));
            yield put(wlmGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchModifyWhite() {
    yield takeEvery(WLM_UPDATE_TABLE_DATA, modifyWhite);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddWhite),
        fork(watchModifyWhite)
    ])
}
