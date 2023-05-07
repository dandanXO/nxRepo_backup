import { call, delay, put, takeLatest } from "redux-saga/effects";
import { PostLoanQuotaRefreshResponse } from "../../../api/PostLoanQuotaRefreshResponse";
import { GetPersonalLoanRecommendResponse } from "../../../api/GetPersonalLoanRecommend";
import moment from "moment-timezone";
import {
    autoRefreshCreator,
    getLoanRecommendFetch,
    PersonalRecommendActions,
    STATE,
} from "./redux";
import { getLoanRecommend, getUsers } from "./api";

let firstLoadingList = true;

export default AppSaga;

function* AppSaga() {
    yield takeLatest(autoRefreshCreator.toString(), autoRefreshSaga);
    yield takeLatest(getLoanRecommendFetch, getLoanRecommendSaga);
}

function* autoRefreshSaga(action: any) {
    try {
        yield put(
            PersonalRecommendActions[STATE.OVERDUE_LOADING](
                STATE.OVERDUE_LOADING
            )
        );
        const result: PostLoanQuotaRefreshResponse = yield call(getUsers);
        const resultData = (result as any).data;
        if (resultData.effective === false) {
            yield delay(20 * 1000);
            yield put(autoRefreshCreator());
        } else {
            yield put(getLoanRecommendFetch());
        }
    } catch (error) {
        yield delay(20 * 1000);
        yield put(autoRefreshCreator());
    }
}

function* getLoanRecommendSaga(action: any) {
    try {
        // @ts-ignore
        const result = yield call(getLoanRecommend);
        const resultData: GetPersonalLoanRecommendResponse = (result as any)
            .data;
        const actions = PersonalRecommendActions;

        // const currentTime = moment("2023-03-17T13:38:47+05:30").tz("Asia/Kolkata");
        const currentTime = moment().tz("Asia/Kolkata");
        // NOTICE: ERROR
        // const expireTime = moment(resultData.quotaExpireTime?.split(".")[0].replace("T", " ")).tz("Asia/Kolkata").utc()
        // const expireTime = moment(resultData.quotaExpireTime).tz("Asia/Kolkata");
        // NOTE: resultData.quotaExpireTime 已經是印度時區了
        const expireTime = moment(resultData.quotaExpireTime);

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

        yield put(PersonalRecommendActions[STATE.UPDATE](resultData));

        if (
            firstLoadingList &&
            resultData?.quotaBar?.max === 0 &&
            isOverdue &&
            isBelow7days
        ) {
            firstLoadingList = false;
            // console.log("[Eric] 第一次開始 refreshing...")
            yield put(PersonalRecommendActions[STATE.LOADING](STATE.LOADING));
            yield put(autoRefreshCreator());
        } else if (
            firstLoadingList &&
            resultData?.quotaBar?.max === 0 &&
            isOverdue &&
            !isBelow7days
        ) {
            yield put(PersonalRecommendActions[STATE.OVERDUE](STATE.OVERDUE));
        } else if (resultData?.quotaBar?.max > 0 && isOverdue) {
            // console.log("[Eric] downloaded recommend products successfully")
            // NOTE: setState(STATE.OVERDUE);
            yield put(PersonalRecommendActions[STATE.OVERDUE](STATE.OVERDUE));
        } else if (resultData?.riskReject) {
            // NOTE: 優先 1
            yield put(PersonalRecommendActions[STATE.REJECT](STATE.REJECT));
        } else if (resultData?.processing) {
            // NOTE: 優先 2
            yield put(
                PersonalRecommendActions[STATE.APPLY_REPEAT](STATE.APPLY_REPEAT)
            );
        } else {
            yield put(
                PersonalRecommendActions[STATE.COUNTDOWN](STATE.COUNTDOWN)
            );
        }
    } catch (error) {
        console.error(error);
        yield put(PersonalRecommendActions[STATE.FAILURE](STATE.FAILURE));
    }
}
