import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { history, showMsg } from 'utils';
import {
    BLC_GET_DEBTS_DATA,
    BLC_GET_TABLE_DATA,
    BLC_GET_DETAIL_DATA,
    BLC_POST_CHECK_INFO,
    BLC_BATCH_POST_CHECK_INFO,
    BLC_MODIFY_ICLOUD_PWD,
    BLC_DISTRIBUTE_ORDER,
    blcGetTableData,
    blcChangeTableLoading,
    blcSetTableData,
    blcChangeSubmitLoading,
    blcChangeDetailData,
    blcSetCurrentOrder,
    blcChangeButtonLoading
} from './actions';
import { getOrderListData, getOrderDetailData, postCheckData, batchPostCheckData, getOperatorListData, getUnionDebtsInfo, postModifyPwd, distributeOrder,reloadUnionDebtsInfo } from '../api';
import { axios } from 'utils';
import { convertBaseInfo, convertICloud } from '../../BusinessRepeatCheck'
import {message} from "antd/lib/index";

const infoDataSelector = (state) => state.windControlCheckState.businessLastCheckState.allData;

function* getTableData(action) {
    yield put(blcChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { data, remainReviewCnt } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            }
            yield put(blcSetTableData(obj));
            yield put(blcSetCurrentOrder(remainReviewCnt));
        }
    } catch (e) {

    }
    yield put(blcChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(BLC_GET_TABLE_DATA, getTableData);
}
//获取详情数据
function* getDetailData(action) {

    const { params: { orderId = '', userId = '' } } = action;
    try{
        // const res = yield call(getOrderDetailData, action.params);
        const [res1] = yield all([
            call(getOrderDetailData, { orderId }),
            // call(getOperatorListData, { userId }),
            //call(getUnionDebtsInfo, { orderId }),
        ])
        if (Number(res1.code) === 200) {
            const data = convertBaseInfo(res1.data);
            const icloudInfo = convertICloud(res1.data);
            //const debtsInfo = res3.data;
            const debtsInfo = [];
            // let callRecords;
            // try{
            //     callRecords = JSON.parse(res2.data['callRecords'] || []);
            // } catch (e) {
            //     callRecords = [];
            // }
            const allData = yield select(infoDataSelector);
            const newData = { 
                             ...allData,
                             info: data, 
                            //  message: { iphoneRecord: callRecords },
                             data: { ...allData['data'], ...icloudInfo },
                             debtsRecord:debtsInfo
                          };
            yield put(blcChangeDetailData(newData));
            history.push(`/businessLastCheck?option=baseInfo`)
        }
    }catch (e) {
        console.log(e)
    }

}
function* watchGetDetailData() {
    yield takeEvery(BLC_GET_DETAIL_DATA, getDetailData);
}
//终审
function* postCheck(action) {
    yield put(blcChangeSubmitLoading(true));
    try {
        const res = yield call(postCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/businessLastCheck');
        }
    } catch (e) {

    }

    yield put(blcChangeSubmitLoading(false));

}
function* watchPostCheck() {
    yield takeEvery(BLC_POST_CHECK_INFO, postCheck)
}



//batch终审
function* bactchPostCheck(action) {
    yield put(blcChangeSubmitLoading(true));
    yield put(blcChangeButtonLoading(true));
    try {
        const res = yield call(batchPostCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/businessLastCheck');
        }
        window.location.reload(); 
    } catch (e) {

    }
    yield put(blcChangeButtonLoading(false));
    yield put(blcChangeSubmitLoading(false));

}
function* watchBatchPostCheck() {
    yield takeEvery(BLC_BATCH_POST_CHECK_INFO, bactchPostCheck)
}



//修改icloud密码
function* modifyICloudPwd(action) {
    try{
        const res = yield call(postModifyPwd, action.params);
        if (Number(res.code) === 200) {
           showMsg('操作成功');
            const allData = yield select(infoDataSelector);
            const info = allData['data']['accountInfo'];
            console.log(allData)
            if(Array.isArray(info) && info.length > 0) {
                const newInfo = info.slice(0);
                newInfo[0]['icloudPwdNew'] = res.data['newPawd'];
                console.log(newInfo);
                const newData = { ...allData, data: { ...allData['data'], accountInfo: newInfo } };
                yield put(blcChangeDetailData(newData));
            }
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyICloudPwd() {
    yield takeEvery(BLC_MODIFY_ICLOUD_PWD, modifyICloudPwd);
}


//分配订单

function* distributeLastOrder(action) {
    yield put(blcChangeTableLoading(true));
    try{
        const res = yield call(distributeOrder, action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            yield put(blcGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(blcChangeTableLoading(false));
}
function* watchDistributeLastOrder() {
    yield takeEvery(BLC_DISTRIBUTE_ORDER, distributeLastOrder)
}

function* watchGetDebtsData() {
    yield takeEvery(BLC_GET_DEBTS_DATA, getLatestDebtsData);
}

function* getLatestDebtsData(action){
    yield put(blcChangeSubmitLoading(true));
    try{
        // const [res1] = yield all([
        //     call(reloadUnionDebtsInfo, { orderId }),
        // ])
        const res1 = yield call(reloadUnionDebtsInfo, { orderNo : action.params.orderNumber});
        if (Number(res1.code) === 200 ) {
            
             const debtsInfo = res1.data;
          
            console.log(debtsInfo)  
             const allData = yield select(infoDataSelector);
             const newData = {
                  ...allData, 
                 debtsRecord:debtsInfo
                };

              console.log(newData)  
             yield put(blcChangeDetailData(newData));
             // const id = yield select(orderIdSelector);
             history.push(`/businessLastCheck?option=unionDebtsInfo`)
        }
    } catch (e) {
        console.log(e);
    }

    yield put(blcChangeSubmitLoading(false));
}



export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetailData),
        fork(watchPostCheck),
        fork(watchBatchPostCheck),
        fork(watchModifyICloudPwd),
        fork(watchDistributeLastOrder),
        fork(watchGetDebtsData)
    ])
}
