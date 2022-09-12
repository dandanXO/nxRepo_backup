import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    ASSET_DETAIL_GET_TABLE_DATA,
    assetDetailChangeTableLoading,
    assetDetailSetTableData
} from './actions';
import { getModelList} from '../api';


function* getTableData(action) {
    yield put(assetDetailChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
        if (res.code === '200') {
            const {data} = res;
            const obj = {
                data: data.content || [],
                pagination: {
                    total: data.total,
                    current: data.pageNumber
                }
            }
            yield put(assetDetailSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(assetDetailChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ASSET_DETAIL_GET_TABLE_DATA, getTableData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
    ])
}
