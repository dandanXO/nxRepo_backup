import {select, spawn, call, put, all, fork, take, takeEvery, takeLeading, takeMaybe, takeLatest} from "redux-saga/effects";
import {createAction, createReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { push } from 'connected-react-router'
import {IndexServiceResponse, Service, UserServiceResponse} from "./IndexFlow";
import moment from "moment-timezone";

// NOTE: 使用者瀏覽頁面
export const userViewIndexPageAction = createAction("userViewIndexPage");

// type STATE = "ready" | "pending"| "success" | "reject";
export enum USER_AUTH_STATE {
  "ready",
  "authing",
  "reject",
  "success",
}

export enum ORDER_STATE {
  "empty",
  "reviewing",
  "hasInComingOverdueOrder",
  "hasOverdueOrder",
  "reject"
}

export enum RISK_CONTROL_STATE {
  "unknow",
  "expired_refresh_able",
  "expired_refresh_one_time",
  "empty_quota",
  "valid" ,
}

interface InitialState {
  indexAPI: IndexServiceResponse | null;
  user: {
    state: USER_AUTH_STATE,
    userName: string;
  },
  order: {
    state: ORDER_STATE;
  },
  riskControl: {
    state: RISK_CONTROL_STATE;
  }
}

const initialState: InitialState = {
  indexAPI: null,
  user: {
    state: USER_AUTH_STATE.ready,
    userName: "",
  },
  order: {
    state: ORDER_STATE.empty,
  },
  riskControl: {
    state: RISK_CONTROL_STATE.unknow,
  },
  // TODO:
  // indexPage: {
  //   state: ""
  // }
}
// NOTICE: refactor me
moment.tz.setDefault("Asia/Kolkata");

// NOTE: PageRedux
export const indexPageSlice = createSlice({
  name: "indexPage",
  initialState,
  reducers: {
    updateUserAPI: (state, action: PayloadAction<UserServiceResponse>) => {
      state.user.userName = action.payload.userName;
      if(action.payload.status === 0) {
        state.user.state = USER_AUTH_STATE.ready;
      } else if(action.payload.status === 1) {
        state.user.state = USER_AUTH_STATE.success;
      } else if(action.payload.status === 2) {
        state.user.state = USER_AUTH_STATE.authing;
      } else if(action.payload.status === 3) {
        state.user.state = USER_AUTH_STATE.reject;
      }
    },
    updateIndexAPI: (state, action: PayloadAction<IndexServiceResponse>) => {
      state.indexAPI = action.payload;

      // NOTICE: order
      if(action.payload.payableRecords.length === 0) {
        state.order.state = ORDER_STATE.empty

      } else if (action.payload.payableRecords.length > 0) {

        // NOTE: order priority
        if(action.payload.payableRecords.some(order => order.overdue)) {
          state.order.state = ORDER_STATE.hasOverdueOrder;
        } else if(action.payload.payableRecords.some(order => {

          const currentTime = moment();
          const expireTime = moment(order.dueDate);
          const isOverdue = expireTime.isBefore(currentTime);
          return isOverdue;
        })) {
          state.order.state = ORDER_STATE.hasInComingOverdueOrder;

        } else if(action.payload.orderUnderReview == true) {
          state.order.state = ORDER_STATE.reviewing;

        } else if(action.payload.riskReject === true && action.payload.refreshable === false) {
          state.order.state = ORDER_STATE.reject;
        }
      }

      // NOTICE: risk control
      const currentTime = moment();
      const expireTime = moment(action.payload.offerExpireTime);
      const isRiskControlOverdue = expireTime.isBefore(currentTime);
      if(isRiskControlOverdue) {
        if(action.payload.refreshable && action.payload.refreshOverRetry === false) {
          state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;
        } else if(action.payload.refreshable && action.payload.refreshOverRetry === true) {
          state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
        }
      } else {
        if(action.payload.availableAmount === 0) {
          state.riskControl.state = RISK_CONTROL_STATE.empty_quota;
        } else {
          state.riskControl.state = RISK_CONTROL_STATE.valid;
        }
      }
    },
  }
})

export function *AppSaga() {
  // yield all([
  //   userViewIndexPageSaga,
  // ])

  // yield takeEvery(userViewIndexPageAction().type, userViewIndexPageSaga);
  yield userViewIndexPageSaga();
}

function *userViewIndexPageSaga() {
  const userResponse: UserServiceResponse = yield call(Service.UserService, {});
  yield put(indexPageSlice.actions.updateUserAPI(userResponse));

  const indexResponse: IndexServiceResponse = yield call(Service.IndexService, {dummy: 1});
  yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));

}

