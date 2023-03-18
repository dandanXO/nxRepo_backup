import {createAction, createSlice} from "@reduxjs/toolkit";
import {API} from "../../../api";
import {GetPersonalLoanRecommendResponse} from "../../../api/GetPersonalLoanRecommend";

export const autoRefreshCreator = createAction("autoRefresh");
export const getLoanRecommendFetch = createAction("getLoanRecommend/fetch");

export enum STATE {
  "INIT" = "INIT",
  "LOADING" = "LOADING",
  "SUCCESS" = "SUCCESS",
  "FAILURE" = "FAILURE",
  "OVERDUE" = "OVERDUE",
  "OVERDUE_LOADING" = "OVERDUE_LOADING",
  "COUNTDOWN" = "COUNTDOWN",
  "APPLY" = "APPLY",
  "APPLY_REPEAT" = "APPLY_REPEAT",
  "APPLY_OVERDUE" = "APPLY_OVERDUE",
  "REJECT" = "REJECT",
}

const initialState: SliceState = {
  data: undefined,
  status: STATE.INIT,
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
    loading: (state: SliceState , action: any) => {
      state.status = STATE.LOADING;
      return state;
    },
    success: (state: SliceState , action: any) => {
      state.status = STATE.SUCCESS
      return state;
    },
    failure: (state: SliceState , action: any) => {
      state.status = STATE.FAILURE;
      return state;
    },
    overdue: (state: SliceState , action: any) => {
      state.status = STATE.OVERDUE;
      return state;
    },
    countdown: (state: SliceState , action: any) => {
      state.status = STATE.COUNTDOWN;
      return state;
    },
    applyRepeat:  (state: SliceState , action: any) => {
      state.status = STATE.APPLY_REPEAT
      return state;
    },
    reject:  (state: SliceState , action: any) => {
      state.status = STATE.REJECT
      return state;
    },
    overdueLoading: (state: SliceState , action: any) => {
      state.status = STATE.OVERDUE_LOADING
      return state;
    },
    apply: (state: SliceState , action: any) => {
      state.status = STATE.APPLY
      return state;
    },
    applyOverdue:  (state: SliceState , action: any) => {
      state.status = STATE.APPLY_OVERDUE
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




