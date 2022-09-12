import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { UserInfoManage, userInfoManageState, userInfoManageSaga } from './UserInfoManage';
import { UserCheckRecord, userCheckRecordSaga, userCheckRecordState } from './UserCheckRecord';
import { UserRepeatCheck, userRepeatCheckSaga, userRepeatCheckState } from './UserRepeatCheck';
import { UserLastCheck, userLastCheckSaga, userLastCheckState } from './UserLastCheck';


const userManageRoutes = [
    { path: '/userInfoManage', component: UserInfoManage },
    { path: '/userCheckRecord', component: UserCheckRecord },
    { path: '/userRepeatCheck', component: UserRepeatCheck },
    { path: '/userLastCheck', component: UserLastCheck },
];

const userManageMenuList = [
    {
        title: '用户管理',
        key: '/userManage',
        icon: 'user',
        children: [
            {
                title: '用户信息管理',
                key: '/userInfoManage',
                icon: 'user'
            },
            {
                title: '用户复审',
                key: '/userRepeatCheck',
                icon: 'hdd'
            },
            {
                title: '用户终审',
                key: '/userLastCheck',
                icon: 'hdd'
            },
            {
                title: '用户审核记录',
                key: '/userCheckRecord',
                icon: 'hdd'
            },
        ]
    }
    
];
const userManageState = combineReducers({
    userInfoManageState,
    userCheckRecordState,
    userRepeatCheckState,
    userLastCheckState,
})
function* userManageSaga(){
    yield all([
        fork(userInfoManageSaga),
        fork(userCheckRecordSaga),
        fork(userRepeatCheckSaga),
        fork(userLastCheckSaga),
    ])
}
export { userManageRoutes, userManageMenuList, userManageState, userManageSaga, userRepeatCheckSaga, userRepeatCheckState, userLastCheckSaga, userLastCheckState };