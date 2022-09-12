
import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { DeviceList, deviceListState, deviceListSaga, deviceListAction } from './DeviceList';
const paramsManageRoutes = [
    { path: '/deviceList', component: DeviceList }
];

const paramsManageMenuList = [
    {
        title: '参数管理',
        key: '/paramsManage',
        icon: 'fork',
        children: [
            {
                title: '设备列表',
                key: '/deviceList',
                icon: 'laptop'
            }
        ]
    }
];
const paramsManageState = combineReducers({
    deviceListState
})
function* paramsManageSaga() {
    yield all([
        fork(deviceListSaga)
    ])
}
export { paramsManageRoutes, paramsManageMenuList, paramsManageState, paramsManageSaga };