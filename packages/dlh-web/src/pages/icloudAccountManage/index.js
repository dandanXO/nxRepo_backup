import { AlreadyDistribute, alreadyDistributeState, alreadyDistributeSaga } from './AlreadyDistribute'
import { WaitDistribute, waitDistributeState, waitDistributeSaga } from './WaitDistribute';
import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';


const iCloudAccountManageRoutes = [
    { path: '/alreadyDistribute', component: AlreadyDistribute },
    { path: '/waitDistribute', component: WaitDistribute },
]
const iCloudAccountManageMenuList = [
    {
        title: 'iCloud账号管理',
        key: '/iCloudAccountManage',
        icon: 'lock',
        children: [
            {
                title: 'iCloud账号列表',
                key: '/waitDistribute',
                icon: 'cloud-upload-o'
            },
            {
                title: '待修改账号',
                key: '/alreadyDistribute',
                icon: 'filter'
            },
        ]
    }
]
const iCloudAccountManageState = combineReducers({
    waitDistributeState,
    alreadyDistributeState

})
function* iCloudAccountManageSaga() {
    yield all([
        fork(waitDistributeSaga),
        fork(alreadyDistributeSaga)
    ])
}

export { iCloudAccountManageMenuList, iCloudAccountManageRoutes, iCloudAccountManageSaga, iCloudAccountManageState };