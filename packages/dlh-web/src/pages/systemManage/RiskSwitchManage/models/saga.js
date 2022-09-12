import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { riskSChangeTableLoading, riskSSetTableData, RISK_S_GET_TABLE_DATA, RISK_S_UPDATE_TABLE_DATA, riskSChangeModalVisible, riskSGetTableData } from './actions';
import { configList, updateConfig } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(riskSChangeTableLoading(true));
    try {
        const res = yield call(configList, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(riskSSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(riskSChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RISK_S_GET_TABLE_DATA, getTableData);
}

function* modifyConfig(action) {
    try {
        const res = yield call(updateConfig, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(riskSChangeModalVisible(false));
            yield put(riskSGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyConfig() {
    yield takeEvery(RISK_S_UPDATE_TABLE_DATA, modifyConfig);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchModifyConfig)
    ])
}
