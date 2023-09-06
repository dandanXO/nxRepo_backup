import { errorFallback } from 'apps/app/src/app/usecaseFlow/utils/errorFallback';
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { takeLatest } from 'redux-saga/effects';

import { BindBankcardAction } from './bindBankcardAction';

export function* watchBindBankcardSaga() {
  const countryName = environment.countryName;
  const { bindBankcardSaga } = yield import(
    `./i18n/${countryName}/bindBankcardSaga`
  );
  yield takeLatest(
    BindBankcardAction.user.bindBankcardSaveAction.type,
    errorFallback,
    bindBankcardSaga
  );
}
