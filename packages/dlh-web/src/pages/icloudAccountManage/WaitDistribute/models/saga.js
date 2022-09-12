import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {
    WDB_UPLOAD_ICLOUD,
    wdbChangeModalLoading,
    wdbChangeModalVisible,
    WDB_GET_TABLE_DATA,
    wdbChangeTableLoading,
    wdbSetTableData,
    wdbGetTableData
} from './actions';
import {postUploadIcloud, getICloudList} from '../api';
import {axios} from 'utils';


function* postUpload(action) {
    yield put(wdbChangeModalLoading(true));
    try {
        const res = yield call(postUploadIcloud, action.params);
        if (Number(res.code) === 200) {
            yield put(wdbChangeModalVisible(false));
            message.success('上传成功');
            yield put(wdbGetTableData({ pageNum: 1, pageSize: 10}));
        }
    } catch (e) {

    }

    yield put(wdbChangeModalLoading(false));
}

function* watchPostUpload() {
    yield takeEvery(WDB_UPLOAD_ICLOUD, postUpload);
}


function* getTableData(action) {
    yield put(wdbChangeTableLoading(true));
    try {
        const res = yield call(getICloudList, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            }
            yield put(wdbSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(wdbChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WDB_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchPostUpload),
        fork(watchGetTableData)
    ])
}
