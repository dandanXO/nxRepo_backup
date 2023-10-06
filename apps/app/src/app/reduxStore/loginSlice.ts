import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { userInfoPersistence } from '../persistant/UserInfoPersistence';

export type UserResendSecondsActionPayload = {
  resendSeconds?: number;
  phoneNo?: string;
};
const initialState: UserResendSecondsActionPayload = {
  resendSeconds: undefined,
  phoneNo: userInfoPersistence.phone || undefined,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateResendSeconds: (
      state,
      action: PayloadAction<UserResendSecondsActionPayload['resendSeconds']>
    ) => {
      state.resendSeconds = action.payload;
    },
    updatePhoneNo: (
      state,
      action: PayloadAction<UserResendSecondsActionPayload['phoneNo']>
    ) => {
      state.phoneNo = action.payload;
    },
  },
});
