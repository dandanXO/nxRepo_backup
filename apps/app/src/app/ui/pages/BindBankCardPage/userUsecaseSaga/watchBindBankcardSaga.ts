import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { takeLatest } from 'redux-saga/effects';

import { IndiaCountry } from '@frontend/shared/domain';

import { errorFallback } from '../../../../uiFlowUsecase/utils/errorFallback';
import { BindBankcardAction } from './bindBankcardAction';

export function* watchBindBankcardSaga() {
  const countryName = environment.countryName;
  if (countryName !== IndiaCountry.countryName) {
    const { bindBankcardSaga } = yield import(
      `./i18n/${countryName}/bindBankcardSaga`
    );
    yield takeLatest(
      BindBankcardAction.user.bindBankcardSaveAction.type,
      errorFallback,
      bindBankcardSaga
    );
  }
}
