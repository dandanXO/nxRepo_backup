import {createAction} from '@reduxjs/toolkit';

export const SystemCaseActions = {
  InitSaga: createAction('InitSaga'),
  Cancel: {
    InitSaga: createAction('Cancel-InitSaga'),
  },

  // TODO: refactor me to indexPage
  SystemCountdownSaga: createAction<string>('SystemCountdownSaga'),
  // TODO: refactor me to indexPage
  SystemRefreshableCountdownSaga: createAction<string>('SystemRefreshableCountdownSaga'),

  SystemGetUserInfoSaga: createAction('SystemGetUserInfoSaga'),

  SystemFetchCouponSaga:createAction('SystemFetchCouponSaga'),
};
