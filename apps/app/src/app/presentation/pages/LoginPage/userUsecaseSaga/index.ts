import {
  ActionCreatorWithPayload,
  createAction,
  PayloadAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

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

// NOTICE:
interface IUseCase {
  name: string;
  system: Record<string, PayloadActionCreator<any>>;
  user: Record<string, PayloadActionCreator<any>>;
}

interface ILoginPageUseCase extends IUseCase {
  system: {
    init: PayloadActionCreator<any>;
    resendSeconds: PayloadActionCreator<UserResendSecondsActionPayload>;
  };
  user: {
    getOTP: PayloadActionCreator<UserGetOTPActionPayload>;
    login: PayloadActionCreator<UserLoginActionPayload>;
  };
}

class LoginPageUseCaseActions implements ILoginPageUseCase {
  name = 'LoginPageUseCaseActions';
  system = {
    init: createAction('LoginPageSataActions-system-init'),
    resendSeconds: createAction<UserResendSecondsActionPayload>(
      'LoginPageSataActions-resendSeconds'
    ),
  };
  user = {
    getOTP: createAction<UserGetOTPActionPayload>(
      'LoginPageSataActions-getOTP'
    ),
    login: createAction<UserLoginActionPayload>(
      'LoginPageSataActions-user-login'
    ),
  };
}
export const LoginPageUseCaseActionsInstance = new LoginPageUseCaseActions();
