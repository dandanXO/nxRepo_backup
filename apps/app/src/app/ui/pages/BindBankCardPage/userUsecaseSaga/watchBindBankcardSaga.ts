import { errorFallback } from '../../../../uiFlowUsecase/utils/errorFallback';
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { takeLatest } from 'redux-saga/effects';

import { BindBankcardAction } from './bindBankcardAction';
import { IndiaCountry } from '@frontend/shared/domain';

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
