import {createAction, createSlice} from "@reduxjs/toolkit";
import {API} from "../../../api";
import {GetPersonalLoanRecommendResponse} from "../../../api/GetPersonalLoanRecommend";

export const autoRefreshCreator = createAction("autoRefresh");
export const getLoanRecommendFetch = createAction("getLoanRecommend/fetch");

export enum STATE {
  "init" = "init",
  "loading" = "loading",
  "success" = "success",
  "failure" = "failure",
  "overdue" = "overdue",
  "overdueLoading" = "overdueLoading",
  "countdown" = "countdown",
  "apply" = "apply",
  "applyRepeat" = "applyRepeat",
  "applyOverdue" = "applyOverdue",
  "reject" = "reject",
}

const initialState: SliceState = {
  data: undefined,
  status: STATE.init,
};
export type SliceState = {
  data: GetPersonalLoanRecommendResponse | undefined;
  status: STATE;
}
export const personalLoanRecommendSlice = createSlice<SliceState, any, any>({
  name: "personalLoanRecommendSlice",
  initialState,
  reducers: {
    update(state: SliceState , action: any) {
      state.data = action.payload;
      return state;
    },
    "loading": (state: SliceState , action: any) => {
      state.status = STATE.loading;
      return state;
    },
    "success": (state: SliceState , action: any) => {
      state.status = STATE.success
      return state;
    },
    "failure": (state: SliceState , action: any) => {
      state.status = STATE.failure;
      return state;
    },
    "overdue": (state: SliceState , action: any) => {
      state.status = STATE.overdue;
      return state;
    },
    "countdown": (state: SliceState , action: any) => {
      state.status = STATE.countdown;
      return state;
    },
    "applyRepeat":  (state: SliceState , action: any) => {
      state.status = STATE.applyRepeat
      return state;
    },
    "reject":  (state: SliceState , action: any) => {
      state.status = STATE.reject
      return state;
    },
    "overdueLoading": (state: SliceState , action: any) => {
      state.status = STATE.overdueLoading
      return state;
    },
    "apply": (state: SliceState , action: any) => {
      state.status = STATE.apply
      return state;
    },
    "applyOverdue":  (state: SliceState , action: any) => {
      state.status = STATE.applyOverdue
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase((API.endpoints.getPersonalLoanRecommend.initiate as any)().name, (state, action) => {
        console.log("extraReducers.state", state);
        console.log("extraReducers.action", action);
      })
  },
})




