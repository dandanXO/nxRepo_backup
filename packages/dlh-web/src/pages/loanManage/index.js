import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { Loaning, loaningState, loaningSaga } from './Loaning';

const loanManageRoutes = [
    { path: '/loaning', component: Loaning }
];

const loanManageMenuList = [
    {
        title: '放款管理',
        key: '/loanManage',
        icon: 'pay-circle-o',
        children: [
            {
                title: '放款中',
                key: '/loaning',
                icon: 'bulb'
            }
        ]
    }
];
const loanManageState = combineReducers({
    loaningState
})
function* loanManageSaga() {
    yield all([
        fork(loaningSaga)
    ])
}
export { loanManageState,loanManageRoutes,loanManageSaga, loanManageMenuList }