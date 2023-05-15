// NOTE: PageRedux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import { USER_AUTH_STATE } from '../domain/user/USER_AUTH_STATE';
import { ORDER_STATE } from '../domain/order/ORDER_STATE';
import { RISK_CONTROL_STATE } from '../domain/risk/RISK_CONTROL_STATE';
import { PayableRecords } from '../api/indexService/PayableRecords';
import { GetIndexResponse } from '../api/indexService/GetIndexResponse';
import { GetQuotaModelStatusResponse } from '../api/loanService/GetQuotaModelStatusResponse';
import { GetUserInfoServiceResponse } from '../api/userService/GetUserInfoServiceResponse';
import { GetOpenIndexResponse } from '../api/indexService/GetOpenIndexResponse';
import { getQuotaModelStatusAction } from '../presentation/pages/IndexPage/userUsecaseSaga/userReacquireCreditSaga';

export interface InitialState {
  openIndexAPI: GetOpenIndexResponse | null;
  indexAPI: GetIndexResponse | null;
  sharedIndex: {
    marquee: string;
  };
  user: {
    state: USER_AUTH_STATE;
    userName: string;
  };
  order: {
    state: ORDER_STATE;
    overdueOrComingOverdueOrder: PayableRecords | null;
  };
  riskControl: {
    state: RISK_CONTROL_STATE;
  };
  api: {
    reacquire: {
      data: GetQuotaModelStatusResponse | null;
      isLoading: boolean;
      // isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  timeout: {
    riskControlDate: string;
    refreshableDate: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  };
}

export type TimePartition = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const initialState: InitialState = {
  openIndexAPI: null,
  indexAPI: null,
  sharedIndex: {
    marquee: '',
  },
  user: {
    state: USER_AUTH_STATE.ready,
    userName: '',
  },
  order: {
    state: ORDER_STATE.empty,
    overdueOrComingOverdueOrder: null,
  },
  riskControl: {
    state: RISK_CONTROL_STATE.unknow,
  },
  api: {
    reacquire: {
      data: null,
      isLoading: false,
      // isFetching: false,
      isSuccess: false,
      isError: false,
    },
  },
  // TODO:
  // indexPage: {
  //   state: ""
  // }
  timeout: {
    riskControlDate: '00:00:00',
    refreshableDate: {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
    },
  },
};

export const indexPageSlice = createSlice({
  name: 'indexPage',
  initialState,
  reducers: {
    updateUserAPI: (
      state,
      action: PayloadAction<GetUserInfoServiceResponse>
    ) => {
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
      // console.log("updateIndexAPI", state, action)
      state.indexAPI = action.payload;
      state.sharedIndex.marquee = action.payload.marquee;

      // TODO: REACTOR ME
      // NOTICE: risk control
      const currentTime = moment();
      const expireTime = moment(action.payload.offerExpireTime);
      const isRiskControlOverdue = expireTime.isBefore(currentTime);
      // console.log("currentTime", currentTime.format());
      // console.log("expireTime", expireTime.format());
      // console.log("isRiskControlOverdue", isRiskControlOverdue);

      // NOTE: 會有其他條件同時相符，所以這邊用if優先權最高-直接第一
      if (action.payload.riskReject === true) {
        // NOTICE: 新客直接被擋或是老客額度被擋，但前端直接視為 ORDER_STATE.reject，
        // NOTICE: order
        state.order.state = ORDER_STATE.reject;
        state.order.overdueOrComingOverdueOrder = null;
      } else if (action.payload.payableRecords.length === 0) {
        // NOTICE: order
        state.order.state = ORDER_STATE.empty;
        state.order.overdueOrComingOverdueOrder = null;
      } else if (action.payload.payableRecords.length > 0) {
        // NOTICE: order
        // NOTE: order priority
        const isOrderOverdue = action.payload.payableRecords.some((order) => {
          if (order.overdue) state.order.overdueOrComingOverdueOrder = order;
          return order.overdue;
        });

        const isAnyOrderComingOverdue = action.payload.payableRecords.some(
          (order) => {
            const currentTime = moment();
            const expireTime = moment(order.dueDate);
            const overdueDay = expireTime.diff(currentTime, 'days');
            // const overdueHour = expireTime.diff(currentTime, "hours");
            // const overdueMinute = expireTime.diff(currentTime, "minute");
            const isOverdueEqual3Days = overdueDay <= 3;
            // console.log("currentTime", currentTime.format())
            // console.log("expireTime", expireTime.format())
            // console.log("overdueDay", overdueDay)
            // console.log("overdueHour", overdueHour)
            // console.log("overdueMinute", overdueMinute)
            // console.log("isOverdueEqual3Days", isOverdueEqual3Days);
            if (isOverdueEqual3Days)
              state.order.overdueOrComingOverdueOrder = order;
            return isOverdueEqual3Days;
          }
        );

        // NOTICE: 訂單優先判斷
        if (isOrderOverdue) {
          state.order.state = ORDER_STATE.hasOverdueOrder;
        } else if (isAnyOrderComingOverdue) {
          // NOTICE: order
          state.order.state = ORDER_STATE.hasInComingOverdueOrder;
        } else if (action.payload.orderUnderReview == true) {
          // NOTICE: order
          state.order.state = ORDER_STATE.reviewing;
          state.order.overdueOrComingOverdueOrder = null;
        } else {
          state.order.state = ORDER_STATE.normal;
        }
      }

      // NOTE: 與後端對規則
      // NOTE: 1.風控到期後的重刷
      // NOTE: 2.風控沒過，沒額度的重刷

      // NOTICE: 風控判斷
      if (
        typeof action.payload.offerExpireTime !== 'undefined' &&
        isRiskControlOverdue
      ) {
        // NOTE: 可重刷
        if (action.payload.refreshable === true) {
          if (action.payload.noQuotaByRetryFewTimes === false) {
            state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;
          } else {
            // state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
            state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_over_3;
          }
          // NOTE: 不可重刷
        } else {
          // NOTE: 可能是尚有額度
          // if (action.payload.noQuotaByRetryFewTimes === true) {
          //   state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
          // } else {
          //   state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time
          // }
        }
      }

      // NOTICE: 會有過期, 但是 noQuotaBalance 為 true 嗎?
      if (action.payload.noQuotaBalance === true) {
        // NOTE: 優先度最後
        state.riskControl.state = RISK_CONTROL_STATE.empty_quota;
      } else if (!isRiskControlOverdue && action.payload.availableAmount > 0) {
        state.riskControl.state = RISK_CONTROL_STATE.valid;
      }
      // REFACTOR ME: 額度不足
      // else if(!isRiskControlOverdue && action.payload.availableAmount === 0) {
      //
      // }
    },
    updateOpenAPI: (state, action: PayloadAction<GetOpenIndexResponse>) => {
      state.openIndexAPI = action.payload;
      state.sharedIndex.marquee = action.payload.marquee;
    },
    reacquire: (state, action) => {
      state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_one_time;
    },
    // NOTICE: 逾期計時器
    updateRiskCountdown: (state, action) => {
      state.timeout.riskControlDate = action.payload;
    },
    expiredRiskCountdown: (state, action) => {
      // state.riskControl.state = RISK_CONTROL_STATE.expired;
      state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;
    },
    // NOTICE: 可重刷取得逾期的計時器
    updateRefreshableCountdown: (state, action) => {
      state.timeout.refreshableDate = action.payload;
    },
    // NOTICE: 取消可重刷取得逾期的計時器
    expiredRefreshableCountdown: (state, action) => {
      state.riskControl.state = RISK_CONTROL_STATE.expired_refresh_able;
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(
      getQuotaModelStatusAction.loadingAction.type,
      (state, action) => {
        state.api.reacquire.isLoading = true;
        // state.api.reacquire.isFetching = true;
      }
    ),
      builder.addCase(
        getQuotaModelStatusAction.successAction.type,
        (state, action) => {
          state.api.reacquire.isLoading = false;
          state.api.reacquire.isSuccess = true;
        }
      ),
      builder.addCase(
        getQuotaModelStatusAction.failureAction.type,
        (state, action) => {
          state.api.reacquire.isLoading = false;
          state.api.reacquire.isError = true;
        }
      );
  },
});
