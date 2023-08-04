import { all } from 'redux-saga/effects';

import { watchIndexPageSaga } from '../presentation/pages/IndexPage/userUsecaseSaga/watchIndexPageSaga';
import { watchLoginPageSaga } from '../presentation/pages/LoginPage/userUsecaseSaga/watchLoginPageSaga';
import { watchPersonalInfoPageSaga } from '../presentation/pages/PersonalInfoPage/userUsecaseSaga/watchPersonalInfoPageSaga';
import { catchSagaError } from './utils/catchSagaError';
import { runSystemInitSaga } from './watchSaga/runSystemInitSaga';
import { watchSystemInitSaga } from './watchSaga/watchSystemInitSaga';
import { watchSystemUseCaseSaga } from './watchSaga/watchSystemUseCaseSaga';
import { watchBindBankcardSaga } from '../presentation/pages/BindBankCardPage/userUsecaseSaga/watchBindBankcardSaga';
import { watchRepaymentPageSaga } from '../presentation/pages/RepaymentPage/userUsecaseSaga/watchRepaymentPageSaga';
import { watchReservationSaga } from '../presentation/pages/RepaymentDetailPage/userUsecaseSaga/watchReservationSaga';

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* WatchAppSaga() {
  try {
    console.log('[app][saga] 1');
    yield all([
      // NOTICE: run init
      runSystemInitSaga(),

      // NOTICE: watch common
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),

      // NOTICE: watch by pages
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      watchPersonalInfoPageSaga(),

      watchBindBankcardSaga(),
      watchRepaymentPageSaga(),
      watchReservationSaga()
    ]);
    console.log('[app][saga] 3');
  } catch (error) {
    console.log('error', error);
    yield catchSagaError(error);
  }
}
