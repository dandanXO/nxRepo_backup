import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { message } from 'antd';
import {
    TOOD_GET_TABLE_DATA,
    toodSetTableData,
    toodChangeTableLoading,
    TOOD_GET_PERSON_DATA,
    toodSetPersonData,
    TOOD_DISTRIBUTE_ORDER,
    toodChangeModalVisible,
    toodChangeSelectKey,
    toodChangePersonType
} from './actions';
import { getOrderListData, getUrgePersonData, distributeOrder } from '../api';


//获取列表数据
function* getTableData(action) {
    yield put(toodChangeTableLoading(true));
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
            yield put(toodSetTableData(obj));
            //请求列表数据后将选中的行制空
            yield put(toodChangeSelectKey([]));
        }
    } catch (e) {

    }

    yield put(toodChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TOOD_GET_TABLE_DATA, getTableData);
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
            yield put(toodChangePersonType(content['type']));
            yield put(toodSetPersonData(personData));
        }
    } catch (e) {

    }
}
function* watchGetPerson() {
    yield takeEvery(TOOD_GET_PERSON_DATA, getPerson);
}
//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(toodChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(TOOD_DISTRIBUTE_ORDER, distributeData);
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData)
    ])
}
