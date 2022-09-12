import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    OOD_GET_TABLE_DATA,
    oodSetTableData,
    oodChangeTableLoading,
    OOD_GET_PERSON_DATA,
    oodSetPersonData,
    OOD_DISTRIBUTE_ORDER,
    oodChangeModalVisible,
    oodChangeSelectKey,
    oodChangePersonType
} from './actions';
import { getOrderListData, getUrgePersonData, distributeOrder } from '../api';


//获取列表数据
function* getTableData(action) {
    yield put(oodChangeTableLoading(true));
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
            yield put(oodSetTableData(obj));
            //请求列表数据后将选中的行制空
            yield put(oodChangeSelectKey([]));
        }
    } catch (e) {

    }

    yield put(oodChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(OOD_GET_TABLE_DATA, getTableData);
}

//获取催收人
function* getPerson(action) {
    try{
        const res = yield call(getUrgePersonData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            const isGroup = content['type'] === 'group';
            const data = isGroup ? content['departmentList'] : content['mssAdminUserList'];
            const personData = data.map(item => ({ name: isGroup ? item['name'] : item.trueName, value: item.id }));
            yield put(oodChangePersonType(content['type']));
            yield put(oodSetPersonData(personData));
        }
    } catch (e) {

    }
}
function* watchGetPerson() {
    yield takeEvery(OOD_GET_PERSON_DATA, getPerson);
}
//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(oodChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(OOD_DISTRIBUTE_ORDER, distributeData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData)
    ])
}
