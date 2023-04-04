import {createAction} from "@reduxjs/toolkit";

export const SystemCaseActions = {
  SystemCountdownSaga: createAction<string>("SystemCountdownSaga"),
  SystemRefreshableCountdownSata: createAction<string>("SystemRefreshableCountdownSata"),
}
