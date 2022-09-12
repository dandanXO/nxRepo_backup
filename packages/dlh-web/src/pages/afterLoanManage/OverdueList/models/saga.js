import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    ODL_GET_TABLE_DATA,
    odlSetTableData,
    odlChangeTableLoading,
    ODL_GET_PERSON,
    odlSetPerson,
    ODL_DISTRIBUTE_ORDER,
    odlChangeModalVisible,
    odlChangeSelectKey,
    odlChangePersonType
} from './actions';
import { getOrderListData, getUrgePersonData, distributeOrder } from '../api';
import {message} from "antd";

function* getTableData(action) {
    yield put(odlChangeTableLoading(true));
    try{
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(odlSetTableData(obj));
            yield put(odlChangeSelectKey([]));
        }
    } catch (e) {

    }
    yield put(odlChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ODL_GET_TABLE_DATA, getTableData);
}

//获取催收人
function* getPerson(action) {
    try{
        const res = yield call(getUrgePersonData, action.params);
        if(Number(res.code) === 200) {
            // const { content } = res;
            // const personData = content.map(item => ({ name: item.trueName, value: item.id }));
            // yield put(odlSetPerson(personData));
            const { data: content } = res;
            const isGroup = content['type'] === 'group';
            const data = isGroup ? content['departmentList'] : content['mssAdminUserList'];
            const personData = data.map(item => ({ name: isGroup ? item['name'] : item.trueName, value: item.id }));
            yield put(odlChangePersonType(content['type']));
            yield put(odlSetPerson(personData));
            action.callback && action.callback();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchGetPerson() {
    yield takeEvery(ODL_GET_PERSON, getPerson);
}

//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(odlChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(ODL_DISTRIBUTE_ORDER, distributeData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData)
    ])
}
