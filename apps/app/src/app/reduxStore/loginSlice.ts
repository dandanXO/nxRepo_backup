import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserResendSecondsActionPayload = {
  resendSeconds: number;
};
const initialState = {
  resendSeconds: 60,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateResendSeconds: (state, action: PayloadAction<UserResendSecondsActionPayload['resendSeconds']>) => {
      state.resendSeconds = action.payload;
    },
  },
});
