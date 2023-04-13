import {select, spawn, call, put, all, fork, take, takeEvery, takeLeading, takeMaybe, takeLatest} from "redux-saga/effects";
import {userLoginAction, userLoginSaga} from "./userLoginSaga";
import {userLogoutAction, userLogoutSaga} from "./userLogoutSaga";
import {createAction} from "@reduxjs/toolkit";
import { push } from '@lagunovsky/redux-react-router'

export function *AppSaga() {
  // sagas will be executed in parallel.
  // yield all([
  //   userFlowSaga,
  //   uiFlowSaga,
  //   blockingSaga,
  // ]);
  // yield fork(nonBlockingSaga);
  // yield spawn(alwaysRootAliveSaga);
  //
  // // other
  // yield take(UserViewIndexPageAction, systemLoadPageSaga);
  // yield take(UserTapPayment, systemLoadPaymentPageSaga)
  // yield take(UserTapProfile, systemLoadProfilePageSaga)
}

const Services = {
  loadIndexPage: () => {
    //
  },
  loadRepaymentPage: () => {
    //
  },
  loadProfilePage: () => {
    //
  }
}

type LoadIndexPageData = {
  name: string;
}
const UserViewIndexPageAction = createAction("UserViewIndexPageAction")
function *systemLoadPageSaga() {
  // yield take()
  yield put(push('/load'));
  const response: LoadIndexPageData = yield call(Services.loadIndexPage);
  // yield put("setLoadIndexPage");
}

const UserTapPayment = createAction("UserTapPayment")
const UserTapOrder = createAction("UserTapOrder")
function *systemLoadPaymentPageSaga() {
  yield put(push('/payment'));
  const response: LoadIndexPageData = yield call(Services.loadRepaymentPage);
  // yield take(UserTapOrder, UserTapOrderSaga);

}
const appOpenRepaymentModal = createAction("appOpenRepaymentModal");
const appCloseRepaymentModal = createAction("appCloseRepaymentModal");
function *UserTapOrderSaga() {
  yield put(appOpenRepaymentModal);
  // yield take(appCloseRepaymentModal, function *() {
  //
  // });
}


const UserTapProfile = createAction("UserTapProfile")
function *systemLoadProfilePageSaga() {
  yield put(push('/profile'));
  const response: LoadIndexPageData = yield call(Services.loadProfilePage)
}

// NOTICE: system saga

function *systemFlowSaga() {
  //
}

// NOTICE: 跟 UI 無關的 Action Saga Style
function *userFlowSaga() {
  // NOTE: Authentication
  yield takeLatest(userLoginAction, userLoginSaga);
  yield takeLatest(userLogoutAction, userLogoutSaga);

  /*
  從 query 取得 token
  使用 token 訪問其他 API。
   */

  // 使用者點擊
  // 使用者滑動
}

// NOTICE: 跟 UI 有關的 Action Saga Style
function *uiFlowSaga() {
  // 當收到首頁轉倒，到首頁
}

function *blockingSaga() {
  // 當 modal loading，離開 APP 會噴訊息。
}
function *nonBlockingSaga() {
  // 當情況Ａ，去背景發送資料
}

function *alwaysRootAliveSaga() {
  // 當發送失敗後，APP不當掉
}

function *alwaysEveryAliveSaga() {
  //
}
