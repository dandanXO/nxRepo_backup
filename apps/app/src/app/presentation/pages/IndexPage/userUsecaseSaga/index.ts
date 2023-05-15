import { createAction } from '@reduxjs/toolkit';
import { LoanServiceRequest } from '../../../../api/loanService/LoanServiceRequest';

// NOTE: 會 deprecated，global 只會有 systemUsecase, UserUsecase 只會在各頁面，會是 Root Page?
export const IndexPageSagaAction = {
  user: {
    viewIndexPageAction: createAction('userViewIndexPage'),
    applyProductAction:
      createAction<UserApplyProductActionPayload>('userApplyProduct'),
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
