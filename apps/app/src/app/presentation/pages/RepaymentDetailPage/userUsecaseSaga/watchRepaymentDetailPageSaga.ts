import { takeLatest } from "redux-saga/effects"
import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
import { systemShowReservationSaga } from "./systemShowReservationSaga"
import { RepaymentDetailPageUseCaseActions } from ".";
import { userReserveSaga } from "./userReserveSaga";
import { userRepaymentDetailSaga } from "./userRepaymentDetailSaga";
import { userRepayDataSaga } from "./userRepayDataSaga";

export function* watchRepaymentDetailPageSaga() {
    yield takeLatest(RepaymentDetailPageUseCaseActions.system.showReservation.type, errorFallback, systemShowReservationSaga)
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.reserve.type, errorFallback, userReserveSaga);
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repaymentDetail.type, errorFallback, userRepaymentDetailSaga)
    yield takeLatest(RepaymentDetailPageUseCaseActions.user.repayData.type, errorFallback, userRepayDataSaga)

}