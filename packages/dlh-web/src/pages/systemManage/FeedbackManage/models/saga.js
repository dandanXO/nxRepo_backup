import { put, call, takeEvery, all, fork, take } from 'redux-saga/effects';
import { FBM_GET_TABLE_DATA, fbmChangeTableLoading, fbmSetTableData, FBM_GET_TYPE_DATA, fbmSetTypeData } from './actions';
import { feedBackData, typeData } from '../api';
import { axios } from 'utils';
import { message } from 'antd';


function* getTableData(action) {
    yield put(fbmChangeTableLoading(true));
    try{
        const res = yield call(feedBackData, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            console.log(data);
            yield put(fbmSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }

    yield put(fbmChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(FBM_GET_TABLE_DATA, getTableData);
}

function* getTypeData(action) {
    try{
        const res = yield call(typeData, action.params);
        if(Number(res.code) === 200) {
            yield put(fbmSetTypeData(res['data'] || []));
        }
    }catch (e) {

    }
}
function* watchGetTypeData() {
    yield takeEvery(FBM_GET_TYPE_DATA, getTypeData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetTypeData)
    ])
}
