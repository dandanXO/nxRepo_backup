import {createAction} from "@reduxjs/toolkit";
import {ReservationDetail} from "../../../../externel/backend/loanService/PostReservationSubmitRequest";
import {repaymentDetailPageInitialStateType} from "apps/app/src/app/reduxStore/repaymentDetailPageSlice";

export type UserReserveActionPayload = {
    reservationDetail: ReservationDetail[]
}



export const RepaymentDetailPageUseCaseActions = {
    system: {
        showReservation: createAction('RepaymentDetailPageUseCaseActions-system-showReservation'),
    },
    user: {
        repaymentDetail: createAction<repaymentDetailPageInitialStateType['repaymentDetail']>('RepaymentDetailPageUseCaseActions-user-repaymentDetail'),
        repayData: createAction('RepaymentDetailPageUseCaseActions-user-repayData'),
        reserve: createAction<UserReserveActionPayload>('RepaymentDetailPageUseCaseActions-user-reserve'),
    },

};
