import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { ClS_GET_TABLE_DATA, clsChangeTableLoading, clsSetTableData, CLS_GET_SOURCE_DATA, clsSetSourceData } from './actions';
import { getChannelStatisticsData, getSourceData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(clsChangeTableLoading(true));
    try{
        const res = yield call(getChannelStatisticsData, action.params);
        if (Number(res.code) === 200) {
            const { data:content } = res;
            const obj = {
                data: content || [],
            }
            yield put(clsSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(clsChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ClS_GET_TABLE_DATA, getTableData);
}

//渠道数据
function* getChannelData(action) {
    try {
        const res = yield call(getSourceData, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            yield put(clsSetSourceData(data.records || []));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetChannelData() {
    yield takeEvery(CLS_GET_SOURCE_DATA, getChannelData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetChannelData)
    ])
}
