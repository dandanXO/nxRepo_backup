import { createAction } from "@reduxjs/toolkit";
import { ReservationDetail } from "apps/app/src/app/api/loanService/PostReservationSubmitRequest";

export interface IReservationProps{
    confirm:boolean;
    reservationDetail:ReservationDetail[]
}
export const ReservationAction = {
    user: {
        reservationAction: createAction<IReservationProps>('reservationAction'),
    },
};