import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    CRD_GET_TABLE_DATA,
    crdChangeTableLoading,
    crdSetTableData,
    CRD_GET_OPERATOR,
    crdSetOperator
} from './actions';
import { getListData, getOperator } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(crdChangeTableLoading(true));
    try {
        const res = yield call(getListData, action.params);
        if(Number(res.code) === 200) {
            console.log(res);
            const { data: content } = res;
            const obj = {
                data: content.records || [],
                pagination: {
                    total: content.totalRecords,
                    current: content.currentPage
                }
            }
            yield put(crdSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(crdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CRD_GET_TABLE_DATA, getTableData);
}

//获取操作人
function* getOperatorList(action) {
    try {
        const res = yield call(getOperator, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(crdSetOperator(data || []));
            action.callback && action.callback();
        }

    } catch (e) {

    }
}

function* watchGetOperatorList() {
    yield takeEvery(CRD_GET_OPERATOR, getOperatorList);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetOperatorList)
    ])
}
