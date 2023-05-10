import {
  createAction,
  PayloadAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

interface IUserUseCaseSaga {
  name?: string;
}

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

interface ILoginPageUserUseCaseSaga extends IUserUseCaseSaga {
  systemInit: PayloadActionCreator<any>;

  userGetOTP: PayloadActionCreator<{
    phone: string;
  }>;
  systemResendSeconds: PayloadActionCreator<{
    resendSeconds: number;
  }>;

  userLogin: PayloadActionCreator<{
    phone: string;
    otp: string;
  }>;
}

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

class LoginPageUserUseCaseSaga implements ILoginPageUserUseCaseSaga {
  systemInit = createAction('LoginPageSataActions-system-init');
  userGetOTP = createAction<UserGetOTPActionPayload>(
    'LoginPageSataActions-getOTP'
  );
  systemResendSeconds = createAction<UserResendSecondsActionPayload>(
    'LoginPageSataActions-resend-seconds'
  );
  userLogin = createAction<UserLoginActionPayload>(
    'LoginPageSataActions-user-login'
  );
}
export const LoginPageUserUseCaseSagaInstance = new LoginPageUserUseCaseSaga();
