import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { history, showMsg } from 'utils';
import { message } from 'antd';
import { convertBaseInfo, convertICloud } from './convertData';
import {
    URC_GET_TABLE_DATA,
    URC_GET_DETAIL_DATA,
    URC_POST_CHECK_INFO,
    URC_BATCH_POST_CHECK_INFO,
    URC_GET_UPLOAD_TOKEN,
    urcChangeDetailData,
    urcChangeTableLoading,
    urcSetTableData,
    urcChangeSubmitLoading,
    urcGetTableData,
    URC_DISTRIBUTE_ACCOUNT,
    URC_REPEAT_DISTRIBUTE,
    URC_UPLOAD_IMG,
    URC_DISTRIBUTE_USER,
    urcSetCurrentUser,
    urcSetBtnDisabled,
    URC_GET_DEBTS_DATA
} from './actions';
import {
    getUserListData,
    getUserDetailData,
    postCheckData,
    batchRepeatChecking,
    getUploadToken,
    getOperatorListData,
    postDistributeAccount,
    postUploadImg,
    distributeUser,
    reapeatDistribute,
    getUnionDebtsInfo,
    reloadUnionDebtsInfo
} from '../api';
import { axios } from 'utils';

const infoDataSelector = (state) => state.userManageState.userRepeatCheckState.allData;
const userIdSelector = (state) => state.userManageState.userRepeatCheckState.userId;
//获取表格数据
function* getTableData(action) {
    yield put(urcChangeTableLoading(true));
    try {
        const res = yield call(getUserListData, action.params);
        if(Number(res.code) === 200) {
            const { data, remainReviewCnt } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data.totalRecords,
                    current: data.currentPage
                }
            }
            yield put(urcSetTableData(obj));
            yield put(urcSetCurrentUser(remainReviewCnt));
        }
    } catch (e) {

    }
    yield put(urcChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(URC_GET_TABLE_DATA, getTableData);
}
//获取复审订单详情
function* getDetailData(action) {
    const { params: { userId = '' } } = action;
    try{
        // const [res1, res2, res3] = yield all([
        //     call(getUserDetailData, { userId }),
        //     call(getOperatorListData, { userId }),
        //     call(getUnionDebtsInfo, { userId }),
        // ])

        const [res1] = yield all([
            call(getUserDetailData, { userId }),
            // call(getOperatorListData, { userId }),
        ])

        // const res = yield call(getUserDetailData, action.params);
        if (Number(res1.code) === 200) {
             const data = convertBaseInfo(res1.data);
            //  const icloudInfo = convertICloud(res1.data);
            //  const debtsInfo = res3.data;
            //  let callRecords;
            // try{
            //     callRecords = JSON.parse(res2.data['callRecords'] || []);
            // } catch (e) {
            //     callRecords = [];
            // }
            // console.log(debtsInfo)  
             const allData = yield select(infoDataSelector);
             const newData = {
                  ...allData, info: data,
                data: { ...allData['data'], },
                //  debtsRecord:debtsInfo
                };

              console.log(newData)  
             yield put(urcChangeDetailData(newData));
             // const id = yield select(userIdSelector);
             history.push(`/userRepeatCheck?option=baseInfo`)
        }
    } catch (e) {
        console.log(e);
    }

}
function* watchGetDetailData() {
    yield takeEvery(URC_GET_DETAIL_DATA, getDetailData);
}
function* watchGetDebtsData() {
    yield takeEvery(URC_GET_DEBTS_DATA, getLatestDebtsData);
}

function* getLatestDebtsData(action){
    yield put(urcChangeSubmitLoading(true));
    try{
        // const [res1] = yield all([
        //     call(reloadUnionDebtsInfo, { userId }),
        // ])
        const res1 = yield call(reloadUnionDebtsInfo, { userNo : action.params.userNumber});
        if (Number(res1.code) === 200 ) {
            
             const debtsInfo = res1.data;
          
            console.log(debtsInfo)  
             const allData = yield select(infoDataSelector);
             const newData = {
                  ...allData, 
                 debtsRecord:debtsInfo
                };

              console.log(newData)  
             yield put(urcChangeDetailData(newData));
             // const id = yield select(userIdSelector);
             history.push(`/userRepeatCheck?option=unionDebtsInfo`)
        }
    } catch (e) {
        console.log(e);
    }

    yield put(urcChangeSubmitLoading(false));
}



//复审
function* postCheck(action) {
    yield put(urcChangeSubmitLoading(true));
    try{
        const res = yield call(postCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/userRepeatCheck');
        }
    }catch (e) {

    }
    yield put(urcChangeSubmitLoading(false));
}

//batch 复审
function* batchPostCheck(action) {
    yield put(urcChangeSubmitLoading(true));
    try{
        const res = yield call(batchRepeatChecking, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/userRepeatCheck');
            window.location.reload(); 
        }
    }catch (e) {

    }
    yield put(urcChangeSubmitLoading(false));
}




function* watchPostCheck() {
    yield takeEvery(URC_POST_CHECK_INFO, postCheck)
}

function* watchBatchPostCheck() {
    yield takeEvery(URC_BATCH_POST_CHECK_INFO, batchPostCheck)
}

//获取文件上传token
function* getUploadTokenFn(action) {
    try {
        const res = yield call(getUploadToken,action.params);
        if(Number(res.code === 200)) {
            const allData = yield select(infoDataSelector);
            const newData = { ...allData, data: { ...allData['data'],uploadInfo: { token: res.data['uploadToken'], key: res.data['fileName'] }} };
            yield put(urcChangeDetailData(newData));
        }
    } catch (e) {

    }


}
function* watchGetUploadToken(){
    yield takeEvery(URC_GET_UPLOAD_TOKEN, getUploadTokenFn);
}
//分配icloud
function* distributeAccount(action) {
    //yield put(urcChangeTableLoading(true));
    try{
        yield put(urcSetBtnDisabled(true));
        const res = yield call(postDistributeAccount,action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            const allData = yield select(infoDataSelector);
            const newData = { ...allData, data: { ...allData['data'], accountInfo: [res.data] } };
            yield put(urcChangeDetailData(newData));
        }
    }catch (e) {
        console.log(e);
    }
    yield put(urcSetBtnDisabled(false));
   // yield put(urcChangeTableLoading(false));
}
function* watchDistributeAccount() {
    yield takeEvery(URC_DISTRIBUTE_ACCOUNT, distributeAccount)
}
//重新分配iCloud
function* repeatDistributeAccount(action) {
    try {
        const res = yield call(reapeatDistribute, action.params);
        if (Number(res.code) === 200) {
            message.success('操作成功');
            const allData = yield select(infoDataSelector);
            const newData = {...allData, data: {...allData['data'], accountInfo: [res.data]}};
            yield put(urcChangeDetailData(newData));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchRepeatDistributeAccount()  {
    yield takeEvery(URC_REPEAT_DISTRIBUTE, repeatDistributeAccount);
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
    yield takeEvery(URC_UPLOAD_IMG, postSaveImg);
}

//分配订单

function* distributeRepeatUser(action) {
    yield put(urcChangeTableLoading(true));
    try{
        const res = yield call(distributeUser, action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            yield put(urcGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(urcChangeTableLoading(false));
}
function* watchDistributeRepeatUser() {
    yield takeEvery(URC_DISTRIBUTE_USER, distributeRepeatUser)
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
        fork(watchDistributeRepeatUser),
        fork(watchRepeatDistributeAccount),
        fork(watchGetDebtsData),
    ])
}
