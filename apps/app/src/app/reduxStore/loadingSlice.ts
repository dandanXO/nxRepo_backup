import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LoadingActionPayload = {
  show: boolean;
};
const initialState = {
    show: false,
};
export const loadingSlice = createSlice({
  name: 'pageLoading',
  initialState,
  reducers: {
    updatePageLoading: (state, action: PayloadAction<LoadingActionPayload['show']>) => {
      state.show = action.payload;
    },
  },
});
