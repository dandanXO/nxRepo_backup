import { createAction } from "@reduxjs/toolkit";
import { ReservationDetail } from "apps/app/src/app/api/loanService/PostReservationSubmitRequest";

export type UserReserveActionPayload = {
    reservationDetail: ReservationDetail[]
}

export const ReservationProductsModalUseCaseActions = {
    system: {
        showReservation: createAction('ReservationProductsModalUseCaseActions-system-showReservation'),
    },
    user: {
        reserve: createAction<UserReserveActionPayload>('ReservationProductsModalUseCaseActions-user-reserve'),
    },

};