import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { history, showMsg } from 'utils';
import { message } from 'antd';
import { convertBaseInfo, convertICloud } from './convertData';
import {
    WCC_GET_TABLE_DATA,
    WCC_GET_DETAIL_DATA,
    WCC_POST_CHECK_INFO,
    WCC_BATCH_POST_CHECK_INFO,
    WCC_GET_UPLOAD_TOKEN,
    wccChangeDetailData,
    wccChangeTableLoading,
    wccSetTableData,
    wccChangeSubmitLoading,
    wccGetTableData,
    WCC_DISTRIBUTE_ACCOUNT,
    WCC_REPEAT_DISTRIBUTE,
    WCC_UPLOAD_IMG,
    WCC_DISTRIBUTE_ORDER,
    wccSetCurrentOrder,
    wccSetBtnDisabled,
    WCC_GET_DEBTS_DATA
} from './actions';
import {
    getOrderListData,
    getOrderDetailData,
    postCheckData,
    batchRepeatChecking,
    getUploadToken,
    getOperatorListData,
    postDistributeAccount,
    postUploadImg,
    distributeOrder,
    reapeatDistribute,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo
} from '../api';
import { axios } from 'utils';

const infoDataSelector = (state) => state.windControlCheckState.businessRepeatCheckState.allData;
const orderIdSelector = (state) => state.windControlCheckState.businessRepeatCheckState.orderId;
//获取表格数据
function* getTableData(action) {
    yield put(wccChangeTableLoading(true));
    try {
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const { data, remainReviewCnt } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(wccSetTableData(obj));
            yield put(wccSetCurrentOrder(remainReviewCnt));
        }
    } catch (e) {

    }
    yield put(wccChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(WCC_GET_TABLE_DATA, getTableData);
}
//获取复审订单详情
function* getDetailData(action) {
    const { params: { orderId = '', userId = '' } } = action;
    try{
        const [res1] = yield all([
            call(getOrderDetailData, { orderId }),
            // call(getOperatorListData, { userId }),
            //call(getUnionDebtsInfo, { orderId }),
        ])
        // const res = yield call(getOrderDetailData, action.params);
        if (Number(res1.code) === 200) {
             const data = convertBaseInfo(res1.data);
             const icloudInfo = convertICloud(res1.data);
             //const debtsInfo = res3.data;
             const debtsInfo = [];
            //  let callRecords;
            // try{
            //     callRecords = JSON.parse(res2.data['callRecords'] || []);
            // } catch (e) {
            //     callRecords = [];
            // }
            //console.log(debtsInfo)  
             const allData = yield select(infoDataSelector);
             const newData = {
                  ...allData, info: data,
                //  message: { iphoneRecord: callRecords }, 
                 data: { ...allData['data'], ...icloudInfo },
                 debtsRecord:debtsInfo
                };

              console.log(newData)  
             yield put(wccChangeDetailData(newData));
             // const id = yield select(orderIdSelector);
             history.push(`/businessRepeatCheck?option=baseInfo`)
        }
    } catch (e) {
        console.log(e);
    }

}
function* watchGetDetailData() {
    yield takeEvery(WCC_GET_DETAIL_DATA, getDetailData);
}
function* watchGetDebtsData() {
    yield takeEvery(WCC_GET_DEBTS_DATA, getLatestDebtsData);
}

function* getLatestDebtsData(action){
    yield put(wccChangeSubmitLoading(true));
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
             yield put(wccChangeDetailData(newData));
             // const id = yield select(orderIdSelector);
             history.push(`/businessRepeatCheck?option=unionDebtsInfo`)
        }
    } catch (e) {
        console.log(e);
    }

    yield put(wccChangeSubmitLoading(false));
}



//复审
function* postCheck(action) {
    yield put(wccChangeSubmitLoading(true));
    try{
        const res = yield call(postCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/businessRepeatCheck');
        }
    }catch (e) {

    }
    yield put(wccChangeSubmitLoading(false));
}

//batch 复审
function* batchPostCheck(action) {
    yield put(wccChangeSubmitLoading(true));
    try{
        const res = yield call(batchRepeatChecking, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/businessRepeatCheck');
            window.location.reload(); 
        }
    }catch (e) {

    }
    yield put(wccChangeSubmitLoading(false));
}




function* watchPostCheck() {
    yield takeEvery(WCC_POST_CHECK_INFO, postCheck)
}

function* watchBatchPostCheck() {
    yield takeEvery(WCC_BATCH_POST_CHECK_INFO, batchPostCheck)
}

//获取文件上传token
function* getUploadTokenFn(action) {
    try {
        const res = yield call(getUploadToken,action.params);
        if(Number(res.code === 200)) {
            const allData = yield select(infoDataSelector);
            const newData = { ...allData, data: { ...allData['data'],uploadInfo: { token: res.data['uploadToken'], key: res.data['fileName'] }} };
            yield put(wccChangeDetailData(newData));
        }
    } catch (e) {

    }


}
function* watchGetUploadToken(){
    yield takeEvery(WCC_GET_UPLOAD_TOKEN, getUploadTokenFn);
}
//分配icloud
function* distributeAccount(action) {
    //yield put(wccChangeTableLoading(true));
    try{
        yield put(wccSetBtnDisabled(true));
        const res = yield call(postDistributeAccount,action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            const allData = yield select(infoDataSelector);
            const newData = { ...allData, data: { ...allData['data'], accountInfo: [res.data] } };
            yield put(wccChangeDetailData(newData));
        }
    }catch (e) {
        console.log(e);
    }
    yield put(wccSetBtnDisabled(false));
   // yield put(wccChangeTableLoading(false));
}
function* watchDistributeAccount() {
    yield takeEvery(WCC_DISTRIBUTE_ACCOUNT, distributeAccount)
}
//重新分配iCloud
function* repeatDistributeAccount(action) {
    try {
        const res = yield call(reapeatDistribute, action.params);
        if (Number(res.code) === 200) {
            message.success('操作成功');
            const allData = yield select(infoDataSelector);
            const newData = {...allData, data: {...allData['data'], accountInfo: [res.data]}};
            yield put(wccChangeDetailData(newData));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchRepeatDistributeAccount()  {
    yield takeEvery(WCC_REPEAT_DISTRIBUTE, repeatDistributeAccount);
}


//图片上传
function* postSaveImg(action) {
    try{
        const res = yield call(postUploadImg, action.params);
        if(Number(res.code) === 200) {
            message.success('上传成功');
        }
    } catch (e) {
        console.log(e);
    }

}
function* watchPostSaveImg() {
    yield takeEvery(WCC_UPLOAD_IMG, postSaveImg);
}

//分配订单

function* distributeRepeatOrder(action) {
    yield put(wccChangeTableLoading(true));
    try{
        const res = yield call(distributeOrder, action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            yield put(wccGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(wccChangeTableLoading(false));
}
function* watchDistributeRepeatOrder() {
    yield takeEvery(WCC_DISTRIBUTE_ORDER, distributeRepeatOrder)
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetailData),
        fork(watchPostCheck),
        fork(watchBatchPostCheck),
        fork(watchGetUploadToken),
        fork(watchDistributeAccount),
        fork(watchPostSaveImg),
        fork(watchDistributeRepeatOrder),
        fork(watchRepeatDistributeAccount),
        fork(watchGetDebtsData),
    ])
}
