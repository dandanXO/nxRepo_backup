import { createAction } from '@reduxjs/toolkit';
import { repaymentDetailPageInitialStateType } from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';

import { ReservationDetail } from '../../../../externel/backend/loanService/PostReservationSubmitRequest';

export type UserReserveActionPayload = {
  reservationDetail: ReservationDetail[];
};

export const RepaymentDetailPageUseCaseActions = {
  system: {
    showReservation: createAction(
      'RepaymentDetailPageUseCaseActions-system-showReservation'
    ),
  },
  user: {
    repaymentDetail: createAction<
      repaymentDetailPageInitialStateType['repaymentDetail']
    >('RepaymentDetailPageUseCaseActions-user-repaymentDetail'),
    repayData: createAction('RepaymentDetailPageUseCaseActions-user-repayData'),
    reserve: createAction<UserReserveActionPayload>(
      'RepaymentDetailPageUseCaseActions-user-reserve'
    ),
  },
};
