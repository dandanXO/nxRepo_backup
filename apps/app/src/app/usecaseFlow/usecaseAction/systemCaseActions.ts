import {createAction} from "@reduxjs/toolkit";

export const SystemCaseActions = {
  InitSaga: createAction("InitSaga"),
  SystemCountdownSaga: createAction<string>("SystemCountdownSaga"),
  SystemRefreshableCountdownSata: createAction<string>("SystemRefreshableCountdownSata"),

}
