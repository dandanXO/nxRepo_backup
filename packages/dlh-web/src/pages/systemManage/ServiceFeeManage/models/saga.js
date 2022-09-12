import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { csfChangeTableLoading, csfSetTableData, CSF_GET_TABLE_DATA, csfChangeModalVisible, csfGetTableData, CSF_UPDATE_TABLE_DATA } from './actions';
import { configList, updateConfig } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(csfChangeTableLoading(true));
    try {
        const res = yield call(configList, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data || []
            }
            yield put(csfSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(csfChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CSF_GET_TABLE_DATA, getTableData);
}

function* modifyConfig(action) {
    try {
        const res = yield call(updateConfig, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(csfChangeModalVisible(false));
            yield put(csfGetTableData({ ...action.params.searchParams}));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyConfig() {
    yield takeEvery(CSF_UPDATE_TABLE_DATA, modifyConfig);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchModifyConfig)
    ])
}
