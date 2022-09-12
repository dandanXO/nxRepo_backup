import { put, call, takeEvery, all, fork, select } from 'redux-saga/effects';
import { history, showMsg } from 'utils';
import {
    ULC_GET_DEBTS_DATA,
    ULC_GET_TABLE_DATA,
    ULC_GET_DETAIL_DATA,
    ULC_POST_CHECK_INFO,
    ULC_BATCH_POST_CHECK_INFO,
    ULC_MODIFY_ICLOUD_PWD,
    ULC_DISTRIBUTE_USER,
    ulcGetTableData,
    ulcChangeTableLoading,
    ulcSetTableData,
    ulcChangeSubmitLoading,
    ulcChangeDetailData,
    ulcSetCurrentUser,
    ulcChangeButtonLoading
} from './actions';
import { getUserListData,getUserDetailData, postCheckData, batchPostCheckData, getOperatorListData, getUnionDebtsInfo, postModifyPwd, distributeUser,reloadUnionDebtsInfo } from '../api';
import { axios } from 'utils';
import { convertBaseInfo, convertICloud } from '../../UserRepeatCheck'
import {message} from "antd/lib";

const infoDataSelector = (state) => state.userManageState.userLastCheckState.allData;

function* getTableData(action) {
    yield put(ulcChangeTableLoading(true));
    try {
        const res = yield call(getUserListData, action.params);
        if(Number(res.code) === 200) {
            const { data, remainReviewCnt } = res;
            const obj = {
                data: data.records || [],
                pagination: {
                    total: data['totalRecords'],
                    current: data['currentPage']
                }
            }
            yield put(ulcSetTableData(obj));
            yield put(ulcSetCurrentUser(remainReviewCnt));
        }
    } catch (e) {

    }
    yield put(ulcChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(ULC_GET_TABLE_DATA, getTableData);
}
//获取详情数据
function* getDetailData(action) {

    const { params: { userId = '' } } = action;
    try{
        // const res = yield call(getUserDetailData, action.params);
        const [res1] = yield all([
            call(getUserDetailData, { userId }),
    
        ])
        if (Number(res1.code) === 200 ) {
            const data = convertBaseInfo(res1.data);
            // const icloudInfo = convertICloud(res1.data);
            // const debtsInfo = res3.data;
            // let callRecords;
            // try{
            //     callRecords = JSON.parse(res2.data['callRecords'] || []);
            // } catch (e) {
            //     callRecords = [];
            // }
            const allData = yield select(infoDataSelector);
            const newData = { 
                             ...allData,
                             info: data, message: {  }, data: { ...allData['data'], },
                            
                          };
            yield put(ulcChangeDetailData(newData));
            history.push(`/userLastCheck?option=baseInfo`)
        }
    }catch (e) {
        console.log(e)
    }

}
function* watchGetDetailData() {
    yield takeEvery(ULC_GET_DETAIL_DATA, getDetailData);
}
//终审
function* postCheck(action) {
    yield put(ulcChangeSubmitLoading(true));
    try {
        const res = yield call(postCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/userLastCheck');
        }
    } catch (e) {

    }

    yield put(ulcChangeSubmitLoading(false));

}
function* watchPostCheck() {
    yield takeEvery(ULC_POST_CHECK_INFO, postCheck)
}



//batch终审
function* bactchPostCheck(action) {
    yield put(ulcChangeSubmitLoading(true));
    yield put(ulcChangeButtonLoading(true));
    try {
        const res = yield call(batchPostCheckData, action.params);
        if(Number(res.code) === 200) {
            showMsg('操作成功');
            history.push('/userLastCheck');
        }
        window.location.reload(); 
    } catch (e) {

    }
    yield put(ulcChangeButtonLoading(false));
    yield put(ulcChangeSubmitLoading(false));

}
function* watchBatchPostCheck() {
    yield takeEvery(ULC_BATCH_POST_CHECK_INFO, bactchPostCheck)
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
                yield put(ulcChangeDetailData(newData));
            }
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyICloudPwd() {
    yield takeEvery(ULC_MODIFY_ICLOUD_PWD, modifyICloudPwd);
}


//分配订单

function* distributeLastUser(action) {
    yield put(ulcChangeTableLoading(true));
    try{
        const res = yield call(distributeUser, action.params);
        if (Number(res.code) === 200) {
            message.success('分配成功');
            yield put(ulcGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(ulcChangeTableLoading(false));
}
function* watchDistributeLastUser() {
    yield takeEvery(ULC_DISTRIBUTE_USER, distributeLastUser)
}

function* watchGetDebtsData() {
    yield takeEvery(ULC_GET_DEBTS_DATA, getLatestDebtsData);
}

function* getLatestDebtsData(action){
    yield put(ulcChangeSubmitLoading(true));
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
             yield put(ulcChangeDetailData(newData));
             // const id = yield select(userIdSelector);
             history.push(`/userLastCheck?option=unionDebtsInfo`)
        }
    } catch (e) {
        console.log(e);
    }

    yield put(ulcChangeSubmitLoading(false));
}



export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetDetailData),
        fork(watchPostCheck),
        fork(watchBatchPostCheck),
        fork(watchModifyICloudPwd),
        fork(watchDistributeLastUser),
        fork(watchGetDebtsData)
    ])
}
