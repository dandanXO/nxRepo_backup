import {select, spawn, call, put, all, fork, take, takeEvery, takeLeading, takeMaybe, takeLatest} from "redux-saga/effects";
import {createAction, createReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { push } from 'connected-react-router'
import {GetIndexResponse, GetOpenIndexResponse, Service, UserServiceResponse} from "./service";
import moment from "moment-timezone";
import {PayableRecords} from "../api/models/PayableRecords";

const INDIA_TIME_ZONE = "Asia/Kolkata";

// NOTE: 使用者瀏覽頁面
export const userViewIndexPageAction = createAction("userViewIndexPage");

// type STATE = "ready" | "pending"| "success" | "reject";
export enum USER_AUTH_STATE {
  "ready",
  "success",
  "authing",
  "reject",
}

export enum ORDER_STATE {
  "empty",
  "reviewing",
  "normal",
  "hasInComingOverdueOrder",
  "hasOverdueOrder",
  "reject",
}

export enum RISK_CONTROL_STATE {
  "unknow",
  "expired_refresh_able",
  "expired_refresh_one_time",
  "empty_quota",
  "valid" ,
}

interface InitialState {
  openIndexAPI: GetOpenIndexResponse | null,
  indexAPI: GetIndexResponse | null;
  sharedIndex: {
    marquee: string;
  },
  user: {
    state: USER_AUTH_STATE,
    userName: string;
  },
  order: {
    state: ORDER_STATE;
    overdueOrComingOverdueOrder: PayableRecords | null;
  },
  riskControl: {
    state: RISK_CONTROL_STATE;
  },
}

const initialState: InitialState = {
  openIndexAPI: null,
  indexAPI: null,
  sharedIndex: {
    marquee: "",
  },
  user: {
    state: USER_AUTH_STATE.ready,
    userName: "",
  },
  order: {
    state: ORDER_STATE.empty,
    overdueOrComingOverdueOrder: null,
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
moment.tz.setDefault(INDIA_TIME_ZONE);

// NOTE: PageRedux
export const indexPageSlice = createSlice({
  name: "indexPage",
  initialState,
  reducers: {
    updateUserAPI: (state, action: PayloadAction<UserServiceResponse>) => {
      state.user.userName = action.payload.userName;
      if (action.payload.status === 0) {
        state.user.state = USER_AUTH_STATE.ready;
      } else if (action.payload.status === 1) {
        state.user.state = USER_AUTH_STATE.success;
      } else if (action.payload.status === 2) {
        state.user.state = USER_AUTH_STATE.authing;
      } else if (action.payload.status === 3) {
        state.user.state = USER_AUTH_STATE.reject;
      }
    },
    updateIndexAPI: (state, action: PayloadAction<GetIndexResponse>) => {
      state.indexAPI = action.payload;
      state.sharedIndex.marquee = action.payload.marquee;


      // TODO: REACTOR ME
      // NOTICE: risk control
      const currentTime = moment()
      const expireTime = moment(action.payload.offerExpireTime);
      const isRiskControlOverdue = expireTime.isBefore(currentTime);
      console.log("currentTime", currentTime.format());
      console.log("expireTime", expireTime.format());
      console.log("isRiskControlOverdue", isRiskControlOverdue);


      // NOTE: 會有其他條件同時相符，所以這邊用if優先權最高-直接第一
      if (action.payload.riskReject === true) {
        // NOTICE: order
        state.order.state = ORDER_STATE.reject;
        state.order.overdueOrComingOverdueOrder = null;

      } else if (action.payload.payableRecords.length === 0) {
        // NOTICE: order
        state.order.state = ORDER_STATE.empty
        state.order.overdueOrComingOverdueOrder = null;

      } else if (action.payload.payableRecords.length > 0) {

        // NOTICE: order
        // NOTE: order priority
        if (action.payload.payableRecords.some(order => {
          if (order.overdue) state.order.overdueOrComingOverdueOrder = order;
          return order.overdue
        })) {
          state.order.state = ORDER_STATE.hasOverdueOrder;
        } else if (action.payload.payableRecords.some(order => {

          const currentTime = moment()
          const expireTime = moment(order.dueDate);
          const overdueDay = expireTime.diff(currentTime, "days");
          // const overdueHour = expireTime.diff(currentTime, "hours");
          // const overdueMinute = expireTime.diff(currentTime, "minute");
          const isOverdueEqual3Days = overdueDay === 3
          // console.log("currentTime", currentTime.format())
          // console.log("expireTime", expireTime.format())
          // console.log("overdueDay", overdueDay)
          // console.log("overdueHour", overdueHour)
          // console.log("overdueMinute", overdueMinute)
          // console.log("isOverdueEqual3Days", isOverdueEqual3Days);

          if (isOverdueEqual3Days) state.order.overdueOrComingOverdueOrder = order;
          return isOverdueEqual3Days;
        })) {
          // NOTICE: order
          state.order.overdueOrComingOverdueOrder = null;
          state.order.state = ORDER_STATE.hasInComingOverdueOrder;

        } else if (action.payload.orderUnderReview == true) {
          // NOTICE: order
          state.order.state = ORDER_STATE.reviewing;
          state.order.overdueOrComingOverdueOrder = null;
        } else {
          state.order.state = ORDER_STATE.normal;
        }

        if (isRiskControlOverdue) {
          // NOTE: 優先度比較低，首頁-認證完成-額度時間到期-需重新取得信用額度
          if (action.payload.refreshable && action.payload.refreshOverRetry === true) {
            state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;
          } else if (action.payload.refreshable && action.payload.refreshOverRetry === false) {
            // TODO:
            // state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
          }
        } else if(!isRiskControlOverdue && action.payload.availableAmount === 0) {
          // NOTE: 優先度最後
          state.riskControl.state = RISK_CONTROL_STATE.empty_quota;

        } else if(!isRiskControlOverdue && action.payload.availableAmount > 0) {
          state.riskControl.state = RISK_CONTROL_STATE.valid;

        }



      }


    },
    updateOpenAPI: (state, action: PayloadAction<GetOpenIndexResponse>) => {
      state.openIndexAPI = action.payload;
      state.sharedIndex.marquee = action.payload.marquee;
    },
    reacquire: (state, action) => {
      state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time;
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

  if(userResponse.status === USER_AUTH_STATE.ready) {
    const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, {packageId: "com.ylbu8.abha"});
    yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));
  } else {
    const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {dummy: 1});
    yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));
  }


}

