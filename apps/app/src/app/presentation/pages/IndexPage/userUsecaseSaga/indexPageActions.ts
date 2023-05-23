import { createAction } from '@reduxjs/toolkit';
import { LoanServiceRequest } from '../../../../api/loanService/LoanServiceRequest';
import { userAuthenticateSaga } from './userAuthenticateSaga';

export const IndexPageSagaAction = {
  user: {
    viewIndexPageAction: createAction('userViewIndexPage'),
    applyProductAction: createAction<UserApplyProductActionPayload>('userApplyProduct'),
    reacquireCreditAction: createAction<null>('userReacquireCredit'),
    authenticateSaga: createAction('userAuthenticateSaga'),
  },
  system: {
    KycBackgroundDataUploadedSaga: createAction<boolean>('SystemKycBackgroundDataUploadedSaga'),
  },
};

export type UserApplyProductActionPayload = Pick<LoanServiceRequest, 'applyAmount' | 'details'>;
