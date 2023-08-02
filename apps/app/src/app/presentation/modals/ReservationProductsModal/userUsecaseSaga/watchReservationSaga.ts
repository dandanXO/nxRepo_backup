import { takeLatest } from "redux-saga/effects"

import { errorFallback } from "apps/app/src/app/usecaseFlow/utils/errorFallback";
import { reservationSaga } from "./reservationSaga"
import { ReservationAction } from "./reservationAction";

export function* watchReservationSaga(){
    yield takeLatest(ReservationAction.user.reservationSubmitAction.type,errorFallback,reservationSaga)
}