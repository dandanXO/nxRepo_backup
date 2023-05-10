import { createAction } from '@reduxjs/toolkit';

// NOTE: REFACTOR ME
export const LoginPageSagaActions = {
  user: {
    getOTP: createAction<UserGetOTPActionPayload>(
      'LoginPageSataActions-getOTP'
    ),
    login: createAction<UserLoginActionPayload>(
      'LoginPageSataActions-user-login'
    ),
  },
  system: {
    init: createAction('LoginPageSataActions-system-init'),
    resendSeconds: createAction<UserResendSecondsActionPayload>(
      'LoginPageSataActions-resend-seconds'
    ),
  },
};

export type UserGetOTPActionPayload = {
  phone: string;
};

export type UserLoginActionPayload = {
  phone: string;
  otp: string;
};

export type UserResendSecondsActionPayload = {
  resendSeconds: number;
};
