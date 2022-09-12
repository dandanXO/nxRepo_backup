import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { IST_GET_TABLE_DATA, istChangeTableLoading, istSetTableData } from './actions';
import { getStatisticsData } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(istChangeTableLoading(true));
    try {
        const res = yield call(getStatisticsData, action.params);
        if(Number(res.code) === 200) {
            const { content } = res;

            yield put(istSetTableData(content));
        }
    } catch (e) {

    }

    yield put(istChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(IST_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
