import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { RVB_REMOVE_BILL, rvbChangeBtnOption } from './actions';
import { postRemoveBill } from '../api';
import { axios } from 'utils';


function* removeOrder(action) {
    try{
        yield put(rvbChangeBtnOption(true));
        const res = yield call(postRemoveBill, action.params);
        if (Number(res.code) === 200) {
            action.callback && action.callback();

        }
    } catch (e) {
        console.log(e);
    }
    yield put(rvbChangeBtnOption(false));
}

function* watchRemoveOrder() {
    yield takeEvery(RVB_REMOVE_BILL, removeOrder);
}

export default function* root() {
    yield all([
        fork(watchRemoveOrder)
    ])
}
