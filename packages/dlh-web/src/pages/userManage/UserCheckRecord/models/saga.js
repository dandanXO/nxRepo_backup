import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    UCRD_GET_TABLE_DATA,
    uCrdChangeTableLoading,
    uCrdSetTableData,
    UCRD_GET_OPERATOR,
    uCrdSetOperator
} from './actions';
import { getListData, getOperator } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(uCrdChangeTableLoading(true));
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
            yield put(uCrdSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(uCrdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(UCRD_GET_TABLE_DATA, getTableData);
}

//获取操作人
function* getOperatorList(action) {
    try {
        const res = yield call(getOperator, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            yield put(uCrdSetOperator(data || []));
            action.callback && action.callback();
        }

    } catch (e) {

    }
}

function* watchGetOperatorList() {
    yield takeEvery(UCRD_GET_OPERATOR, getOperatorList);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetOperatorList)
    ])
}
