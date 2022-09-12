import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import { orEdChangeLoading, orEdSetTableData, OR_ED_GET_TABLE_DATA, orEdChangeBtnLoading, OR_ED_ADD_TABLE_RECORD, orEdChangeVisible } from './actions';
import { getListData, addRecord } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(orEdChangeLoading(true));
    try{
        const res = yield call(getListData, action.params);
        if (Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            };

            yield put(orEdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(orEdChangeLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OR_ED_GET_TABLE_DATA, getTableData);
}

function* overOrderEditData(action) {
    yield put(orEdChangeBtnLoading(true));
    try {
        const res = yield call(addRecord,action.params);
        if(Number(res.code) === 200) {
            message.success("操作成功");
            yield put(orEdChangeVisible(false));
            action.callback && action.callback();
        }
    } catch (e) {

    }
    yield put(orEdChangeBtnLoading(false));
}

function* watchOverOrderEditData() {
    yield takeEvery(OR_ED_ADD_TABLE_RECORD, overOrderEditData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchOverOrderEditData)
    ])
}
