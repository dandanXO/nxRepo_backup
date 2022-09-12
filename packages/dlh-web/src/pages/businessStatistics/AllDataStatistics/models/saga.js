import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { ADS_GET_TABLE_DATA, adsChangeTableLoading, adsSetTableData } from './actions';
import { getStatisticsData } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(adsChangeTableLoading(true));
    try {
        const res = yield call(getStatisticsData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;

            yield put(adsSetTableData(content));
        }
    } catch (e) {

    }

    yield put(adsChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ADS_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
