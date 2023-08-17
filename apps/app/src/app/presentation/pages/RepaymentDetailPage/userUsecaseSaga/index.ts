import { createAction } from "@reduxjs/toolkit";
import { ReservationDetail } from "apps/app/src/app/api/loanService/PostReservationSubmitRequest";
import { repaymentDetailPageInitialStateType } from "apps/app/src/app/reduxStore/repaymentDetailPageSlice";

export type UserReserveActionPayload = {
    reservationDetail: ReservationDetail[]
}



export const RepaymentDetailPageUseCaseActions = {
    system: {
        showReservation: createAction('RepaymentDetailPageUseCaseActions-system-showReservation'),
    },
    user: {
        repaymentDetail: createAction<repaymentDetailPageInitialStateType['repaymentDetail']>('RepaymentDetailPageUseCaseActions-user-repaymentDetail'),
        repayCreate: createAction<repaymentDetailPageInitialStateType['repaymentData']>('RepaymentDetailPageUseCaseActions-user-repayCreate'),
        reserve: createAction<UserReserveActionPayload>('RepaymentDetailPageUseCaseActions-user-reserve'),
    },

};