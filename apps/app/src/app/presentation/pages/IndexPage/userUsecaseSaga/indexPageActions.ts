import { createAction } from '@reduxjs/toolkit';
import { LoanServiceRequest } from '../../../../api/loanService/LoanServiceRequest';

export const IndexPageSagaAction = {
  user: {
    viewIndexPageAction: createAction('userViewIndexPage'),
    applyProductAction: createAction<UserApplyProductActionPayload>('userApplyProduct'),
    reacquireCreditAction: createAction<null>('userReacquireCredit'),
  },
  system: {
    KycBackgroundDataUploadedSaga: createAction<boolean>(
      'SystemKycBackgroundDataUploadedSaga'
    ),
  },
};

export type UserApplyProductActionPayload = Pick<
  LoanServiceRequest,
  'applyAmount' | 'details'
>;
