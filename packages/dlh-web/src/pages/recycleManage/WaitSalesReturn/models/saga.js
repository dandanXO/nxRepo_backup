import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { WSR_GET_TABLE_DATA, WSR_SALES_RETURN, wsrChangeTableLoading, wsrSetTableData } from './actions';
import { getOrderListData, salesReturn } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(wsrChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { content } = res;
            const obj = {
                data: content.records || [],
                pagination: {
                    total: content.totalRecords,
                    current: content.currentPage
                }
            }
            yield put(wsrSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(wsrChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WSR_GET_TABLE_DATA, getTableData);
}

//提交审核结果
function* submitCheckResult(action) {
    try {
        const res = yield call(salesReturn, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchSubmitCheckResult() {
    yield takeEvery(WSR_SALES_RETURN, submitCheckResult);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchSubmitCheckResult)
    ])
}
