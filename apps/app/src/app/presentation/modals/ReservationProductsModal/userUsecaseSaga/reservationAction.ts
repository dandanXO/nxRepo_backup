import { createAction } from "@reduxjs/toolkit";
import { InitialStateType } from "apps/app/src/app/reduxStore/modalSlice";

export const ReservationAction = {
    user: {
        reservationSubmitAction: createAction<InitialStateType['reservationProductsModal']>('reservationProductsModal'),
    },
};