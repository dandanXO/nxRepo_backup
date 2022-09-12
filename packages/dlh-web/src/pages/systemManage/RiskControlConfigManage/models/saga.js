import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { rcCfChangeTableLoading, rcCfSetTableData, RCCF_GET_TABLE_DATA, rcCfChangeModalVisible, rcCfGetTableData, RCCF_UPDATE_TABLE_DATA } from './actions';
import { riskControlConfigList, riskControlUpdateConfig } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(rcCfChangeTableLoading(true));
    try {
        const res = yield call(riskControlConfigList, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(rcCfSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(rcCfChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(RCCF_GET_TABLE_DATA, getTableData);
}

function* modifyConfig(action) {
    try {
        const res = yield call(riskControlUpdateConfig, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(rcCfChangeModalVisible(false));
            yield put(rcCfGetTableData({ pageSize: 10, pageNum: 1,type: 5 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyConfig() {
    yield takeEvery(RCCF_UPDATE_TABLE_DATA, modifyConfig);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchModifyConfig)
    ])
}
