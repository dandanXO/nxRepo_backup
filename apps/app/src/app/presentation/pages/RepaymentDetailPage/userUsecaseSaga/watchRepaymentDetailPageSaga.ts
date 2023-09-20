import { takeLatest } from "redux-saga/effects"
import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
import { systemShowReservationSaga } from "./systemShowReservationSaga"
import { RepaymentDetailPageUseCaseActions } from ".";
import { userReserveSaga } from "./userReserveSaga";
import { userRepaymentDetailSaga } from "./userRepaymentDetailSaga";
import { environment } from "../../../../../environments/environmentModule/environment";
import { PhilippinesCountry } from "../../../../../../../../libs/shared/domain/src/country/PhilippinesCountry";

export function* watchRepaymentDetailPageSaga() {
    yield takeLatest(RepaymentDetailPageUseCaseActions.system.showReservation.type, errorFallback, systemShowReservationSaga)
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.reserve.type, errorFallback, userReserveSaga);
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repaymentDetail.type, errorFallback, userRepaymentDetailSaga)

    const countryName = environment.countryName;
    const { userRepayDataSaga } = countryName === PhilippinesCountry.countryName ?
      yield import(`./i18n/${countryName}/userRepayDataSaga`):
      yield import("./userRepayDataSaga")
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repayData.type, errorFallback, userRepayDataSaga)
}
