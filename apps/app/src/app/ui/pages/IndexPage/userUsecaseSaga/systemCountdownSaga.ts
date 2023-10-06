import { delay, put } from 'redux-saga/effects';

import { getTimeInfoBetweenCurrentAndCountDown } from '@frontend/shared/date';

import { indexPageSlice } from '../../../../reduxStore/indexPageSlice';
import { catchSagaError } from '../../../../uiFlowUsecase/utils/catchSagaError';

export function* systemCountdownSaga(action: any) {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // console.log("systemCountdownSaga.action", action);
    let countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);

    // NOTE: 更新倒數顯示資料
    yield put(indexPageSlice.actions.updateRiskCountdown(countdown.time));

    // NOTE: 更新每秒倒數顯示資料
    while (countdown.end === false && countdown.time !== '00:00:00') {
      yield delay(1000);
      countdown = getTimeInfoBetweenCurrentAndCountDown(action.payload);
      yield put(indexPageSlice.actions.updateRiskCountdown(countdown.time));
    }

    // NOTE: 結束倒數計時
    yield put(indexPageSlice.actions.expiredRiskCountdown({}));
  } catch (error) {
    yield catchSagaError(error);
  }
}
