import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PendingActionPayload = {
  isPending: boolean;
};
const initialState = {
    isPending: false,
};
export const rtkPendingSlice = createSlice({
  name: 'rtkPending',
  initialState,
  reducers: {
    updateRtkPending: (state, action: PayloadAction<PendingActionPayload['isPending']>) => {
      state.isPending = action.payload;
    },
  },
});
