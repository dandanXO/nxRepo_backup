import moment from "moment-timezone";
import {put, select, delay} from "redux-saga/effects";
import {indexPageSlice} from "../systemUsecaseStoreSlice/indexPageSlice";
import {UseCaseActions} from "../../usecaseActions/useCaseActions";

export function *systemRefreshableCountdownSata(action: any) {
  console.log("systemRefreshableCountdownSata.action", action);

  let countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);
  while(countdown.end === false) {
    yield delay(1000)
    countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);
    // console.log("countdown", countdown.time);
    yield put(indexPageSlice.actions.updateRefreshableCountdown(countdown.time));
  }
  // NOTICE: finished countdown
  yield put(indexPageSlice.actions.expiredRefreshableCountdown({}));
  // NOTE: 不主動問後端資訊
  // yield put(UseCaseActions.UserViewIndexPageAction());
}

// NOTICE: 顯示倒數字串
const getTimeInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {
  // NOTICE: REFACTOR ME
  const currentTime = moment();
  // console.log("[test] currentTime.format", currentTime.format("YYYY-MM-DD HH:mm:ss"));
  const nextTime = moment(quotaExpireTime)
  // console.log("[test] tomorrow.format", nextTime.format("YYYY-MM-DD HH:mm:ss"))
  const diffTime = nextTime.diff(currentTime, "seconds");
  // console.log("[test] diffTime", diffTime);
  const duration = moment.duration(diffTime, "seconds");
  // console.log("[test] duration", duration);

  const padStartZero = (number: number) => {
    return String(number).padStart(2, "0");
  }
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  const end = hours === 0 && minutes === 0 && seconds === 0;
  // const time = `${padStartZero(days)} : ${padStartZero(hours)} : ${padStartZero(minutes)} : ${padStartZero(seconds)}`;
  return {
    // time: time,
    time: {
      days: padStartZero(days),
      hours: padStartZero(hours),
      minutes: padStartZero(minutes),
      seconds: padStartZero(seconds),
    },
    end,
  };
}
