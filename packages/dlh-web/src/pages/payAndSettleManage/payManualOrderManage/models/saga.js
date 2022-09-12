import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import { message } from 'antd';
import {
    PAY_MANUAL_ORDER_GET_TABLE_DATA,
    payManualOrderChangeTableLoading,
    payManualOrderSetTableData,
    payManualOrderGetTableData,
    payManualOrderChangeModalVisible,
    PAY_MANUAL_ORDER_ADD_TABLE_DATA,
    PAY_MANUAL_ORDER_UPDATE_TABLE_DATA,
    PAY_MANUAL_ORDER_DELETE_MODEL
} from './actions';
import { getModelList, addModel, updateModel, deleteModelByIds } from '../api';


function* getTableData(action) {
    yield put(payManualOrderChangeTableLoading(true));
    try {
        const res = yield call(getModelList, action.params);
        if (res.code === '200') {
            const {data} = res;
            const obj = {
                data: data.content || [],
                pagination: {
                    total: data.total,
                    current: data.pageNumber
                }
            }
            yield put(payManualOrderSetTableData(obj));
        }
    } catch (e) {

    }
    yield put(payManualOrderChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(PAY_MANUAL_ORDER_GET_TABLE_DATA, getTableData);
}
//添加渠道

function* addChannel(action) {
    try{
        const res = yield call(addModel, action.params);
        if(res.code === '200') {
            if ("jumpUrl" == res.data.nextStep) {
                var url = res.data.nextTar;                                 //转向网页的地址;
                var name = '支付页面';                           //网页名称，可为空;
                var iWidth = 500;                          //弹出窗口的宽度;
                var iHeight = 1334;                        //弹出窗口的高度;
                var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
                var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
                window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
            }
            message.success('请在弹出的页面中进行支付，如未弹出，请设置浏览器通过页面拦截');
            yield put(payManualOrderChangeModalVisible(false));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchAddChannel() {
    yield takeEvery(PAY_MANUAL_ORDER_ADD_TABLE_DATA, addChannel);
}

function* modifyChannel(action) {
    try {
        const res = yield call(updateModel, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payManualOrderChangeModalVisible(false));
            yield put(payManualOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchModifyChannel() {
    yield takeEvery(PAY_MANUAL_ORDER_UPDATE_TABLE_DATA, modifyChannel);
}
function* deleteModel(action) {
    try{
        const res = yield call(deleteModelByIds, action.params);
        if(res.code === '200') {
            message.success('操作成功');
            yield put(payManualOrderChangeModalVisible(false));
            yield put(payManualOrderGetTableData({ pageSize: 10, pageNum: 1 }));
        }
    } catch (e) {
        console.log(e);
    }
}

function* watchDeleteModel() {
    yield takeEvery(PAY_MANUAL_ORDER_DELETE_MODEL, deleteModel);
}

export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchAddChannel),
        fork(watchModifyChannel),
        fork(watchDeleteModel)
    ])
}
