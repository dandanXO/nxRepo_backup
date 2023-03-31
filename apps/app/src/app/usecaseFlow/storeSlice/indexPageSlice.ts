// NOTE: PageRedux
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserServiceResponse} from "../../services/userService/userService";
import {GetIndexResponse, PayableRecords} from "../../services/indexService/getIndexService";
import moment from "moment-timezone";
import {GetOpenIndexResponse} from "../../services/indexService/getOpenIndexService";
import {ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE} from "../index";


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
      // console.log("currentTime", currentTime.format());
      // console.log("expireTime", expireTime.format());
      // console.log("isRiskControlOverdue", isRiskControlOverdue);


      // NOTE: 會有其他條件同時相符，所以這邊用if優先權最高-直接第一
      if (action.payload.riskReject === true) {
        // NOTICE: order
        state.order.state = ORDER_STATE.reject;
        state.order.overdueOrComingOverdueOrder = null;

      }
        // else if(action.payload.noQuotaBalance === true) {
        //   // NOTE: 優先度最後
        //   state.riskControl.state = RISK_CONTROL_STATE.empty_quota;
        //   // noQuotaBalance
      // }
      else if (action.payload.payableRecords.length === 0) {
        // NOTICE: order
        state.order.state = ORDER_STATE.empty
        state.order.overdueOrComingOverdueOrder = null;

      } else if (action.payload.payableRecords.length > 0) {

        // NOTICE: order
        // NOTE: order priority
        const isOrderOverdue = action.payload.payableRecords.some(order => {
          if (order.overdue) state.order.overdueOrComingOverdueOrder = order;
          return order.overdue
        })

        const isAnyOrderComingOverdue = action.payload.payableRecords.some(order => {
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
        })

        // NOTICE: 訂單優先判斷
        if (isOrderOverdue) {
          state.order.state = ORDER_STATE.hasOverdueOrder;
        } else if (isAnyOrderComingOverdue) {
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

      }

      if (action.payload.refreshable && action.payload.refreshOverRetry === false) {
        state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;

        // NOTE: 差別? 額度刷新超過次數
      } else if (action.payload.refreshable && action.payload.refreshOverRetry === true) {
        // TODO:
        // state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
      } else if (action.payload.noQuotaByRetryFewTimes === true) {
        // NOTE: 差別? 刷新超過N次都没有额度
        state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_over_3;
      }
      if (action.payload.noQuotaBalance === true) {
        // NOTE: 優先度最後
        state.riskControl.state = RISK_CONTROL_STATE.empty_quota;
      }
        // else if(!isRiskControlOverdue && action.payload.availableAmount === 0) {
        //
      // }
      else if (!isRiskControlOverdue && action.payload.availableAmount > 0) {
        state.riskControl.state = RISK_CONTROL_STATE.valid;
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
