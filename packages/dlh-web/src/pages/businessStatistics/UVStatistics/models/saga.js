import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { UV_STATISTIC_GET_TABLE_DATA, uvStatisticChangeTableLoading, uvStatisticSetTableData } from './actions';
import { getListData } from '../api';


function* getTableData(action) {
    console.log("action", action);

    yield put(uvStatisticChangeTableLoading(true));
    try{
        const response = yield call(getListData, action.params);
        if (response.status === 200) {
            console.log(response);
            const {data} = response;
            const obj = {
                data: data.content || [],
                pagination: {
                    total: data.totalElements,
                    current: data.number
                }
            };
            console.log("uvStatisticSetTableData");
            yield put(uvStatisticSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(uvStatisticChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(UV_STATISTIC_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData)
    ])
}
