import moment from 'moment-timezone';
import { put, select, delay } from 'redux-saga/effects';
import { indexPageSlice } from '../../../reduxStore/indexPageSlice';
import { catchSagaError } from '../../../utils/catchSagaError';

export function* systemCountdownSaga(action: any) {
  try {
    // console.log("systemCountdownSaga.action", action);
    let countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);
    yield put(indexPageSlice.actions.updateRiskCountdown(countdown.time));

    while (countdown.end === false && countdown.time !== '00:00:00') {
      yield delay(1000);
      countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);
      yield put(indexPageSlice.actions.updateRiskCountdown(countdown.time));
    }
    // NOTICE: finished countdown
    yield put(indexPageSlice.actions.expiredRiskCountdown({}));
  } catch (error) {
    yield catchSagaError(error);
  }
}

// NOTICE: 顯示倒數字串
const getTimeInfoBetweenCurrentAndCountDown = (quotaExpireTime: string) => {
  // NOTICE: REFACTOR ME
  const currentTime = moment();
  // console.log("[test] currentTime.format", currentTime.format("YYYY-MM-DD HH:mm:ss"));
  const nextTime = moment(quotaExpireTime);
  // console.log("[test] tomorrow.format", nextTime.format("YYYY-MM-DD HH:mm:ss"))
  const diffTime = nextTime.diff(currentTime, 'seconds');
  // console.log("[test] diffTime", diffTime);
  const duration = moment.duration(diffTime, 'seconds');
  // console.log("[test] duration", duration);

  const padStartZero = (number: number) => {
    return String(number).padStart(2, '0');
  };
  const hours = Math.max(duration.hours(), 0);
  const minutes = Math.max(duration.minutes(), 0);
  const seconds = Math.max(duration.seconds(), 0);
  const end = hours === 0 && minutes === 0 && seconds === 0;
  const time = `${padStartZero(hours)}:${padStartZero(minutes)}:${padStartZero(
    seconds
  )}`;
  return {
    time,
    end,
  };
};
