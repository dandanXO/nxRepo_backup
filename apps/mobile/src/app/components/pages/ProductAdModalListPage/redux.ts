import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {takeLatest, put, call, delay} from "redux-saga/effects";
import queryString from "query-string";
import {PostLoanQuotaRefreshResponse} from "../../../api/PostLoanQuotaRefreshResponse";
import axios from "axios";
import {API} from "../../../api";
import {GetPersonalLoanRecommendResponse} from "../../../api/GetPersonalLoanRecommend";
import moment from "moment-timezone";

// NOTE: Just for testing
// https://redux-toolkit.js.org/api/createAsyncThunk
// export const refreshToFetchLoanQuota = createAsyncThunk("/api/v2/loan/quota/refresh",
//   async (arg: null, thunkAPI) => {
//
//     const parsedQueryString = queryString.parse(window.location.search);
//     const token = parsedQueryString.token
//       ? (parsedQueryString.token as string)
//       : "";
//
//     const response = await fetch(`/api/v2/loan/quota/refresh`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: token,
//         Authorization: "45d9ab38654247e88406fa06308fa604",
//       }
//     })
//     const data = await response.json() as PostLoanQuotaRefreshResponse;
//     console.log("refreshToFetchLoanQuota.data", data)
//     if (response.status < 200 || response.status >= 300) {
//       return thunkAPI.rejectWithValue(data)
//     }
//     return data
//   },
//   {
//     condition: (data, { getState, extra }) => {
//       console.log("refreshToFetchLoanQuota.condition.data", data)
//       console.log("refreshToFetchLoanQuota.condition.getState", getState())
//       console.log("refreshToFetchLoanQuota.condition.extra", extra)
//       return true;
//     },
//   }
// )


export const autoRefreshCreator = createAction("autoRefresh");
// export const autoRefreshAction = autoRefreshCreator();


const getUsers = () => {
  const parsedQueryString = queryString.parse(window.location.search);
  const token = parsedQueryString.token
    ? (parsedQueryString.token as string)
    : "";

  return axios.post('/api/v2/loan/quota/refresh',{
    data: undefined,
  }, {
    headers: {
      // Authorization: token,
      Authorization: "45d9ab38654247e88406fa06308fa604",
    }
  })
};

function *autoRefreshSaga(action: any) {
  function *refetch() {
    yield delay(20 * 1000);
    yield put(autoRefreshCreator());
  }
  try {
    yield put((personalLoanRecommendSlice.actions as any).overdueLoading());
    const result: PostLoanQuotaRefreshResponse = yield call(getUsers);
    const resultData = (result as any).data;
    if(resultData.effective === false) {
      yield refetch();
    } else {
      yield put(getLoanRecommendFetch());
    }
  } catch (error) {
    // console.error(error);
    yield refetch();
  }
}

const getLoanRecommend = () => {
  //   : "";
  return axios.get('/api/v2/product/personal-recommend?count=',{
    headers: {
      // Authorization: token,
      Authorization: "45d9ab38654247e88406fa06308fa604",
    }
  })
};

let firstLoadingList = true;

function *getLoanRecommendSaga(action: any) {
  try {
    // @ts-ignore
    const result = yield call(getLoanRecommend);
    const resultData: GetPersonalLoanRecommendResponse = (result as any).data;
    const actions = personalLoanRecommendSlice.actions ;

    // const currentTime = moment("2023-03-17T13:38:47+05:30").tz("Asia/Kolkata");
    const currentTime = moment().tz("Asia/Kolkata");
    // NOTICE: ERROR
    // const expireTime = moment(resultData.quotaExpireTime?.split(".")[0].replace("T", " ")).tz("Asia/Kolkata").utc()
    const expireTime = moment(resultData.quotaExpireTime).tz("Asia/Kolkata");

    // console.log("[eric] currentTime.format", currentTime.format())
    // console.log("[eric] expireTime.format", expireTime.format())
    // console.log("[eric] expireTime.utc.format", expireTime.utc().format())
    // console.log("[eric] expireTime.isUTC", expireTime.isUTC())
    // console.log("[eric] test", currentTime.diff(expireTime, "seconds"))
    // console.log("[eric] test", currentTime.diff(expireTime, "second"))
    // console.log("[eric] test", currentTime.diff(expireTime, "minutes"))
    // console.log("[eric] test", currentTime.diff(expireTime, "minute"))
    // console.log("[eric] test", currentTime.diff(expireTime, "day"))

    const isOverdue = expireTime.isBefore(currentTime);

    // console.log("[eric] isOverdue", isOverdue)
    // console.log("[eric] isSame", currentTime.isSame(expireTime))
    // console.log("[eric] firstLoadingList", firstLoadingList)

    const isBelow7days = currentTime.diff(expireTime, "day") <= 7;
    // console.log("[eric] isBelow7days", isBelow7days)

    yield put((actions as any).update(resultData));
    // yield put((personalLoanRecommendSlice.actions as any).update());

    if(
      firstLoadingList &&
      resultData?.quotaBar?.min === 0 &&
      isOverdue && isBelow7days
    ) {
      firstLoadingList = false;
      // console.log("[Eric] 第一次開始 refreshing...")
      // NOTE: setState(STATE.OVERDUE_LOADING);
      yield put((personalLoanRecommendSlice.actions as any).loading());
      yield put(autoRefreshCreator())
    } else if (
      firstLoadingList &&
      resultData?.quotaBar?.min === 0 &&
      isOverdue && !isBelow7days
    ) {
      yield put((actions as any).success());
      yield put((personalLoanRecommendSlice.actions as any).overdue())
    } else if(
      resultData?.quotaBar?.min > 0 &&
      isOverdue
    ) {
      // console.log("[Eric] downloaded recommend products successfully")
      yield put((actions as any).success());
      // NOTE: setState(STATE.OVERDUE);
      yield put((personalLoanRecommendSlice.actions as any).overdue())
    } else if(resultData?.riskReject) {
      // NOTE: 優先 1
      yield put((actions as any).success());
      yield put((personalLoanRecommendSlice.actions as any).reject())
    } else if (resultData?.processing){
      // NOTE: 優先 2
      yield put((actions as any).success());
      yield put((personalLoanRecommendSlice.actions as any).applyRepeat())
    } else {
      yield put((actions as any).success());
      yield put((personalLoanRecommendSlice.actions as any).countdown())
    }
  } catch (error) {
    console.error(error);
    yield put((personalLoanRecommendSlice.actions as any).failure());
  }
}

type FetchActionStatus =
  "init" |
  "loading" |
  "success" |
  "failure" |
  "overdue" |
  "overdueLoading"|
  "countdown" |
  "apply"|
  "applyRepeat" |
  "applyOverdue" |
  "reject";

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

export const getLoanRecommendFetch = createAction("getLoanRecommend/fetch");

export default AppSaga;

function *AppSaga() {
  yield takeLatest(autoRefreshCreator.toString(), autoRefreshSaga);
  yield takeLatest(getLoanRecommendFetch, getLoanRecommendSaga);
}
