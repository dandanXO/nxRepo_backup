import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { cfrChangeTableLoading, cfrSetTableData, CFR_GET_TABLE_DATA, cfrChangeModalVisible, cfrGetTableData, CFR_UPDATE_TABLE_DATA } from './actions';
import { configList, updateConfig } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(cfrChangeTableLoading(true));
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
            yield put(cfrSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(cfrChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CFR_GET_TABLE_DATA, getTableData);
}

function* modifyConfig(action) {
    try {
        const res = yield call(updateConfig, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(cfrChangeModalVisible(false));
            yield put(cfrGetTableData({ ...action.params.searchParams}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyConfig() {
    yield takeEvery(CFR_UPDATE_TABLE_DATA, modifyConfig);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchModifyConfig)
    ])
}
