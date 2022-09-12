import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    LRD_GET_TABLE_DATA,
    lrdChangeTableLoading,
    lrdSetTableData,
    LRD_PAY_MONEY,
    LRD_GET_MODAL_DATA,
    lrdSetModalData,
    lrdChangeModalLoading,
    lrdChangeModalVisible
} from './actions';
import { message } from 'antd';
import { getListData, payMoney, listDetail } from '../api';
import { axios } from 'utils';


//获取统计列表
function* getTableData(action) {
    yield put(lrdChangeTableLoading(true));
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

            yield put(lrdSetTableData(obj));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(lrdChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(LRD_GET_TABLE_DATA, getTableData);
}

function* getDetail(action) {
    yield put(lrdChangeModalVisible(true));
    yield put(lrdChangeModalLoading(true));
    try{
        const res = yield call(listDetail, action.params);
        if(Number(res.code) === 200) {
            const { data } = res;
            const obj = {
                data: data['records'] || [],
                total: data['totalRecords'],
                current: data['currentPage']
            };
            yield put(lrdSetModalData(obj))
        }
    } catch (e) {

    }
    yield put(lrdChangeModalLoading(false));
}

function* watchGetDetail() {
    yield takeEvery(LRD_GET_MODAL_DATA, getDetail);
}

function* payMoneyData(action) {
    try {
        const res = yield call(payMoney, action.params);
        if(Number(res.code) === 200) {
            message.success("操作成功，放款可能会有延迟，请勿重复点击放款按钮，请稍后刷新列表查看状态");
            action.callback && action.callback();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchPayMoneyData() {
    yield takeEvery(LRD_PAY_MONEY, payMoneyData);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchPayMoneyData),
        fork(watchGetDetail)
    ])
}
