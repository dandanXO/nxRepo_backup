import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { RecyclingList, recyclingListState, recyclingListSaga } from './RecyclingList';
import { WaitQualityCheck, waitQualityCheckState, waitQualityCheckSaga } from './WaitQualityCheck';
import { QualityCheckList, qualityCheckListState, qualityCheckListSaga } from './QualityCheckList';
import { WaitFollow, waitFollowState, waitFollowSaga } from './WaitFollow';
import { FollowList, followListState, followListSaga } from './FollowList';
import { WaitSalesReturn, waitSalesReturnState, waitSalesReturnSaga } from './WaitSalesReturn';
import { SalesReturnList, salesReturnListState, salesReturnListSaga } from './SalesReturnList';

const recycleManageRoutes = [
    { path: '/recyclingList', component: RecyclingList },
    { path: '/waitQualityCheck', component: WaitQualityCheck },
    { path: '/qualityCheckList', component: QualityCheckList },
    { path: '/waitFollow', component: WaitFollow },
    { path: '/followList', component: FollowList },
    { path: '/waitSaleReturn', component: WaitSalesReturn },
    { path: '/salesReturnList', component: SalesReturnList }
];

const recycleManageMenuList = [
    {
        title: '回收管理',
        key: '/recycleManage',
        icon: 'profile',
        children: [
            {
                title: '回收中订单',
                key: '/recyclingList',
                icon: 'wallet'
            },
            {
                title: '待质检订单',
                key: '/waitQualityCheck',
                icon: 'layout'
            },
            {
                title: '质检记录',
                key: '/qualityCheckList',
                icon: 'file-text'
            },
            {
                title: '待跟进订单',
                key: '/waitFollow',
                icon: 'tag-o'
            },
            {
                title: '跟进记录',
                key: '/followList',
                icon: 'save'
            },
            {
                title: '待退货订单',
                key: '/waitSaleReturn',
                icon: 'calculator'
            },
            {
                title: '退货记录',
                key: '/salesReturnList',
                icon: 'select'
            }
        ]
    }
]
const recycleManageState = combineReducers({
    recyclingListState,
    waitQualityCheckState,
    qualityCheckListState,
    waitFollowState,
    followListState,
    waitSalesReturnState,
    salesReturnListState
});
function* recycleManageSaga() {
    yield all([
        fork(recyclingListSaga),
        fork(waitQualityCheckSaga),
        fork(qualityCheckListSaga),
        fork(waitFollowSaga),
        fork(followListSaga),
        fork(waitSalesReturnSaga),
        fork(salesReturnListSaga)
    ])
}
export { recycleManageState, recycleManageRoutes, recycleManageMenuList, recycleManageSaga };