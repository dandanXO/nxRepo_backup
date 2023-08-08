import { createAction } from "@reduxjs/toolkit";
import { ReservationDetail } from "apps/app/src/app/api/loanService/PostReservationSubmitRequest";

export type UserReserveActionPayload = {
    reservationDetail: ReservationDetail[]
}

export const RepaymentDetailPageUseCaseActions = {
    system: {
        showReservation: createAction('RepaymentDetailPageUseCaseActions-system-showReservation'),
    },
    user: {
        reserve: createAction<UserReserveActionPayload>('RepaymentDetailPageUseCaseActions-user-reserve'),
    },

};