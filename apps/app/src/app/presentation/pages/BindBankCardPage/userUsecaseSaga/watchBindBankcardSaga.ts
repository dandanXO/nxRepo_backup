import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
// import { bindBankcardSaga } from "./i18n/pakistan/bindBankcardSaga";
import { takeLatest ,takeEvery } from "redux-saga/effects";
import { BindBankcardAction } from "./bindBankcardAction";
import { environment } from "apps/app/src/environments/environmentModule/environment";
import { PakistanCountry } from "libs/shared/domain/src/country/PakistanCountry";
import { MexicoCountry } from "libs/shared/domain/src/country/MexicoCountry";

export function* watchBindBankcardSaga() {
    const countryName = environment.country === MexicoCountry.country ? MexicoCountry.countryName : PakistanCountry.countryName;
    const { bindBankcardSaga } = yield import(`./i18n/${countryName}/bindBankcardSaga`);
    yield takeLatest(BindBankcardAction.user.bindBankcardSaveAction.type, errorFallback, bindBankcardSaga);
}
