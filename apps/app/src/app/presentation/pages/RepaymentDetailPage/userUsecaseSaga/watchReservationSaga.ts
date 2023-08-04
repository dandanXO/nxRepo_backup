import { takeLatest } from "redux-saga/effects"
import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
import { systemShowReservationSaga } from "./systemShowReservationSaga"
import { ReservationProductsModalUseCaseActions } from ".";
import { userReserveSaga } from "./userReserveSaga";

export function* watchReservationSaga() {
    yield takeLatest(ReservationProductsModalUseCaseActions.system.showReservation.type, errorFallback, systemShowReservationSaga)
    yield takeLatest(ReservationProductsModalUseCaseActions.user.reserve.type, errorFallback, userReserveSaga)
}