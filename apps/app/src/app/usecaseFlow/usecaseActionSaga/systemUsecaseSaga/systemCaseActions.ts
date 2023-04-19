import {createAction} from "@reduxjs/toolkit";

export const SystemCaseActions = {
  InitSaga: createAction("InitSaga"),
  SystemCountdownSaga: createAction<string>("SystemCountdownSaga"),
  SystemRefreshableCountdownSaga: createAction<string>("SystemRefreshableCountdownSaga"),
  SystemGetUserInfoSaga: createAction("SystemGetUserInfoSaga"),
  Cancel: {
    InitSaga: createAction("Cancel-InitSaga"),
  }
}
