import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { WFW_SUBMIT_RESULT,WFW_GET_TABLE_DATA, wfwSetTableData, wfwChangeTableLoading } from './actions';
import { getOrderListData, followOrder } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(wfwChangeTableLoading(true));
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
            yield put(wfwSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(wfwChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WFW_GET_TABLE_DATA, getTableData);
}

//提交审核结果
function* submitCheckResult(action) {
    try {
        const res = yield call(followOrder, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchSubmitCheckResult() {
    yield takeEvery(WFW_SUBMIT_RESULT, submitCheckResult);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchSubmitCheckResult)
    ])
}
