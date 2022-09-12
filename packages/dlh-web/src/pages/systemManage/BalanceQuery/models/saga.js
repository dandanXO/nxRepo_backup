import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { GET_ALL_BALANCE_QUERY_DATA, GET_BALANCE_QUERY_DATA, setBalanceQuery } from './actions';
import { getBalanceQuery } from '../api';


function* getAllBalanceQueryData(action) {
  
    const res = yield call(getBalanceQuery,action.params); // 取得全部短信商餘額
    yield put(setBalanceQuery(res));
}

function* watchGetAllBalanceQueryData() {
    yield takeEvery(GET_ALL_BALANCE_QUERY_DATA, getAllBalanceQueryData);
}

function* getBalanceQueryData(action) {

    const { balanceQueryList, smsVenderName } = action.params
    const lastestBalance = yield call(getBalanceQuery, { smsVenderName }); // 更新單一短信商餘額
    const balanceQueryData = balanceQueryList.reduce((prev, curr) => {
        curr.venderCode === lastestBalance[0].venderCode ? prev.push(...lastestBalance) : prev.push(curr);
        return prev
    }, []);
    yield put(setBalanceQuery(balanceQueryData));
}

function* watchGetBalanceQueryData() {
    yield takeEvery(GET_BALANCE_QUERY_DATA, getBalanceQueryData);
}


export default function* root() {
    yield all([
        fork(watchGetAllBalanceQueryData),
        fork(watchGetBalanceQueryData)
    ])
}
