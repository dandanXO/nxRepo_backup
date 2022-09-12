import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { WQC_GET_TABLE_DATA, wqcChangeTableLoading, wqcSetTableData, WQC_SUMIT_CHECK_RESULT } from './actions';
import { getOrderListData, checkExpress } from '../api';
import { axios } from 'utils';

//获取列表数据
function* getTableData(action) {
    yield put(wqcChangeTableLoading(true));
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
            yield put(wqcSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(wqcChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WQC_GET_TABLE_DATA, getTableData);
}

//提交审核结果
function* submitCheckResult(action) {
    try {
        const res = yield call(checkExpress, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            action.callback && action.callback();
        }
    } catch (e) {

    }
}
function* watchSubmitCheckResult() {
    yield takeEvery(WQC_SUMIT_CHECK_RESULT, submitCheckResult);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchSubmitCheckResult)
    ])
}
