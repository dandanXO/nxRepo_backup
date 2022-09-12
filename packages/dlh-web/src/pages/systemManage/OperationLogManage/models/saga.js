import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    OLMG_GET_TABLE_DATA,
    olmgSetTableData,
    OLMG_SET_MAPPING_LIST_DATA,
    OLMG_GET_MAPPING_LIST_DATA ,
    olmgSetMappingListData,
    olmgChangeTableLoading,
} from './actions';
import { logList, mappingList } from '../api';
import { axios } from 'utils';

function* getTableData(action) {
    yield put(olmgChangeTableLoading(true));
    try {
        const res = yield call(logList, action.params);
        if(Number(res.code) === 200) {
            // const { content } = res;
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(olmgSetTableData(obj));
        }
    } catch (e) {

    }

    yield put(olmgChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OLMG_GET_TABLE_DATA, getTableData);
}

//部门数据
function* getMappingListData(action) {
    try {
        const res = yield call(mappingList, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            yield put(olmgSetMappingListData(content))
        }
    } catch (e) {

    }
}

function* watchGetMappingListData() {
    yield takeEvery(OLMG_GET_MAPPING_LIST_DATA, getMappingListData);
}



export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetMappingListData),
    ])
}
