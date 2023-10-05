import {delay, put} from 'redux-saga/effects';

import {indexPageSlice} from '../../../../reduxStore/indexPageSlice';
import {catchSagaError} from '../../../../uiUsecaseFlow/utils/catchSagaError';
import {IndexPageSagaAction} from './indexPageActions';
import {getTimePartInfoBetweenCurrentAndCountDown} from "@frontend/shared/date";

export function* systemRefreshableCountdownSaga(action: any) {
  // NOTICE: 防止錯誤後無法重新 watch
  try {
    // console.log('systemRefreshableCountdownSaga.action', action);
    let countdown = getTimePartInfoBetweenCurrentAndCountDown(action.payload);
    while (countdown.end === false) {
      yield delay(1000);
      countdown = getTimePartInfoBetweenCurrentAndCountDown(action.payload);
      // console.log("countdown", countdown.time);
      // NOTE: 更新倒數顯示資料
      yield put(indexPageSlice.actions.updateRefreshableCountdown(countdown.time));
    }
    // NOTE: 結束倒數計時
    yield put(indexPageSlice.actions.expiredRefreshableCountdown({}));

    // TODO: refactor me
    // NOTE: 主動問後端最新資料 -> 改成倒數完不主動要資料
    // yield put(IndexPageSagaAction.user.viewIndexPageAction());
  } catch (error) {
    yield catchSagaError(error);
  }
}

