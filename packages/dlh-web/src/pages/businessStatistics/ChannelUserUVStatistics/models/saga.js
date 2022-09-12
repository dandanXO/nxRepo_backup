import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { CHANNEL_USER_UV_STATISTIC_GET_TABLE_DATA, channelUserUvStatisticChangeTableLoading, channelUserUvStatisticSetTableData } from './actions';
import { getListData } from '../api';
import { axios } from 'utils';


function* getTableData(action) {
    yield put(channelUserUvStatisticChangeTableLoading(true));
    try{
        const res = yield call(getListData, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(channelUserUvStatisticSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(channelUserUvStatisticChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CHANNEL_USER_UV_STATISTIC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
