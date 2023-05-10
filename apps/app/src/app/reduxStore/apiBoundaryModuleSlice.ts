import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  show: boolean;
  title?: string;
  message?: string;
};
const initialState: InitialStateType = {
  show: false,
  title: '',
  message: '',
};
export const APIBoundaryModuleSlice = createSlice({
  name: 'APIBoundaryModule',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<InitialStateType>) => {
      state.show = action.payload.show;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});
