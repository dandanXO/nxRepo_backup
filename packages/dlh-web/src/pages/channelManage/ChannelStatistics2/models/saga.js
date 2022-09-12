import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { CS2_GET_SOURCE_DATA, CS2_GET_TABLE_DATA, cs2ChangeTableLoading, cs2SetSourceData,  cs2SetTableData } from './actions';
import { getChannelStatisticsData, getSourceData } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData (action) {
    yield put(cs2ChangeTableLoading(true));
    try {
        const res = yield call(getChannelStatisticsData, action.params);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size
            }
        }
        yield put(cs2SetTableData(obj));
    } catch (e) {
        console.log(e);
    }
    yield put(cs2ChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CS2_GET_TABLE_DATA, getTableData);
}

//渠道数据
function* getChannelData(action) {
    try {
        const res = yield call(getSourceData, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            yield put(cs2SetSourceData(data.records || []));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetChannelData() {
    yield takeEvery(CS2_GET_SOURCE_DATA, getChannelData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetChannelData)
    ])
}
