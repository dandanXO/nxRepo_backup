import {AnyAction, createAction, createReducer, PayloadAction} from "@reduxjs/toolkit";
import {GetPersonalLoanRecommendResponse} from "../../../api/GetPersonalLoanRecommend";

export const autoRefreshCreator = createAction("autoRefresh");
export const getLoanRecommendFetch = createAction("getLoanRecommend/fetch");

export enum STATE {
  // NOTE: 畫面初始化
  "INIT" = "INIT",
  "UPDATE" = "UPDATE",
  // NOTE: 資料進行任何 API 反饋畫面讀取中
  "LOADING" = "LOADING",
  // NOTE: success 分為以下好多情況
  // "SUCCESS" = "SUCCESS",
  "COUNTDOWN" = "COUNTDOWN",
  "OVERDUE" = "OVERDUE",
  "OVERDUE_LOADING" = "OVERDUE_LOADING",
  "APPLY" = "APPLY",
  "APPLY_OVERDUE" = "APPLY_OVERDUE",
  "APPLY_REPEAT" = "APPLY_REPEAT",
  "REJECT" = "REJECT",
  // NOTE: 任何 api 有 failure
  "FAILURE" = "FAILURE",
}

const PersonalRecommendActionsName = "PersonalRecommendActions"

export const PersonalRecommendActions = {
  // NOTICE: Fetch API
  [STATE.UPDATE]: createAction<GetPersonalLoanRecommendResponse>(`${PersonalRecommendActionsName}/${STATE.UPDATE}`),
  // NOTICE: Page Status
  [STATE.LOADING]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.LOADING}`),
  [STATE.COUNTDOWN]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.COUNTDOWN}`),
  [STATE.OVERDUE]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.OVERDUE}`),
  [STATE.OVERDUE_LOADING]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.OVERDUE_LOADING}`),
  [STATE.APPLY]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.APPLY}`),
  [STATE.APPLY_OVERDUE]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.APPLY_OVERDUE}`),
  [STATE.APPLY_REPEAT]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.APPLY_REPEAT}`),
  [STATE.REJECT]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.REJECT}`),
  [STATE.FAILURE]: createAction<STATE>(`${PersonalRecommendActionsName}/${STATE.FAILURE}`),
}

const isPersonalRecommendActions = (action: AnyAction) => {
  // NOTE: SAME
  return Object.keys(PersonalRecommendActions).map(item => `${PersonalRecommendActionsName}/${item}`).indexOf(action.type) > -1 && action.type;
  // NOTE: SAME
  // return Object.keys(PersonalRecommendActions).map(item => `${PersonalRecommendActionsName}/${item}`).indexOf(action.type) > -1 && action.type !== STATE.UPDATE
}

const initialState: SliceState = {
  data: undefined,
  status: STATE.INIT,
};

export type SliceState = {
  data: GetPersonalLoanRecommendResponse | undefined;
  status: STATE;
}

export const personalRecommendActionsReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(PersonalRecommendActions[STATE.UPDATE], (state: SliceState, action: PayloadAction<GetPersonalLoanRecommendResponse>) => {
        state.data = action.payload
      })
      .addMatcher(isPersonalRecommendActions, (state, action) => {
        // @ts-ignore
        state.status = action.payload;
      })
  }
)


