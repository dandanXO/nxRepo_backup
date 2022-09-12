import { all, fork } from 'redux-saga/effects';
import { Login, loginManageSaga, loginManageState } from './Login/index';
import {combineReducers} from "redux";


const loginRoutes = [
    { path: '/login', component: Login }
];

const loginState = combineReducers({
    loginManageState
})
function* loginSaga() {
    yield all([
        fork(loginManageSaga)
    ])
}

export { loginRoutes, loginState, loginSaga }