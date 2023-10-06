import { all } from 'redux-saga/effects';

import { watchBindBankcardSaga } from '../ui/pages/BindBankCardPage/userUsecaseSaga/watchBindBankcardSaga';
import { watchIndexPageSaga } from '../ui/pages/IndexPage/userUsecaseSaga/watchIndexPageSaga';
import { watchLoginPageSaga } from '../ui/pages/LoginPage/userUsecaseSaga/watchLoginPageSaga';
import { watchPersonalInfoPageSaga } from '../ui/pages/PersonalInfoPage/userUsecaseSaga/watchPersonalInfoPageSaga';
import { watchRepaymentDetailPageSaga } from '../ui/pages/RepaymentDetailPage/userUsecaseSaga/watchRepaymentDetailPageSaga';
import { watchRepaymentPageSaga } from '../ui/pages/RepaymentPage/userUsecaseSaga/watchRepaymentPageSaga';
import { catchSagaError } from './utils/catchSagaError';
import { runSystemInitSaga } from './watchSaga/runSystemInitSaga';
import { watchSystemInitSaga } from './watchSaga/watchSystemInitSaga';
import { watchSystemUseCaseSaga } from './watchSaga/watchSystemUseCaseSaga';

// NOTICE: 每個 saga 的 error 得自己 catch, AppSaga 不會收到
export function* WatchAppSaga() {
  try {
    console.log('[app][saga] 1');

    yield all([
      // NOTICE: watch common
      watchSystemInitSaga(),
      watchSystemUseCaseSaga(),

      // NOTICE: watch by pages
      watchLoginPageSaga(),
      watchIndexPageSaga(),
      watchPersonalInfoPageSaga(),

      watchBindBankcardSaga(),
      watchRepaymentPageSaga(),
      watchRepaymentDetailPageSaga(),

      // NOTICE: run init
      runSystemInitSaga(),
    ]);
    console.log('[app][saga] 3');
  } catch (error) {
    console.log('error', error);
    yield catchSagaError(error);
  }
}
