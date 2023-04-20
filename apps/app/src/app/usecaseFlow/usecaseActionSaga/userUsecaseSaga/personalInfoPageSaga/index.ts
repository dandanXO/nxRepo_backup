import {takeLatest} from "redux-saga/effects";
import {systemCallGetUserInfoSaga} from "../sharedSaga/systemCallGetUserInfoSaga";
import {createAction} from "@reduxjs/toolkit";
import {errorFallback} from "../../../utils/errorFallback";

export const PersonalInfoPageSagaActions = {
  user: {
  },
  system: {
    init: createAction("PersonalInfoPageSagaActions-system-init"),
  }
}
export function *watchPersonalInfoPageSaga() {
  console.log("[app][appSaga] 1.3")
  yield takeLatest(PersonalInfoPageSagaActions.system.init.type, errorFallback, systemCallGetUserInfoSaga)
}
