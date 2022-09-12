import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import { cfyChangeTableLoading, cfySetTableData, CFY_GET_TABLE_DATA, cfyChangeModalVisible, cfyGetTableData, CFY_UPDATE_TABLE_DATA } from './actions';
import { yysConfigList, updateYysConfig } from '../api';
import {axios} from 'utils';


function* getTableData(action) {
    yield put(cfyChangeTableLoading(true));
    try {
        const res = yield call(yysConfigList, action.params);
        if (Number(res.code) === 200) {
            const {data} = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(cfySetTableData(obj));
        }
    } catch (e) {

    }
    yield put(cfyChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(CFY_GET_TABLE_DATA, getTableData);
}

function* modifyConfig(action) {
    try {
        const res = yield call(updateYysConfig, action.params);
        if(Number(res.code) === 200) {
            message.success('操作成功');
            yield put(cfyChangeModalVisible(false));
            yield put(cfyGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyConfig() {
    yield takeEvery(CFY_UPDATE_TABLE_DATA, modifyConfig);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchModifyConfig)
    ])
}
