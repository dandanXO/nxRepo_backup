import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { H5LoanList, h5LoanListState, h5LoanListSaga } from './H5LoanList';
import { AdManage, adManageState, adManageSaga } from './AdManage';
import { RecallSetting, recallSettingState, recallSettingSaga } from './RecallSetting';
const h5ManageRoutes = [
    { path: '/h5LoanList', component: H5LoanList },
    { path: '/adManage', component: AdManage },
    { path: '/recallSetting', component: RecallSetting },
];

const h5ManageMenuList = [
    {
        title: '导流管理',
        key: '/h5Manage',
        icon: 'paper-clip',
        children: [
            {
                title: '产品管理',
                key: '/h5LoanList',
                icon: 'laptop'
            },
            {
                title: '广告管理',
                key: '/adManage',
                icon: 'setting'
            }, 
            {
                title: '召回设定',
                key: '/recallSetting',
                icon: 'RecallSetting'
            }
        ]
    }
];
const h5ManageState = combineReducers({
    h5LoanListState,
    adManageState,
    recallSettingState
})
function* h5ManageSaga(){
    yield all([
        fork(h5LoanListSaga),
        fork(adManageSaga),
        fork(recallSettingSaga)
    ])
}
export { h5ManageRoutes, h5ManageMenuList, h5ManageState, h5ManageSaga };
