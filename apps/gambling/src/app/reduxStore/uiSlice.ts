import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IUISlice = {
  openMenuDrawer: boolean;
}
const initialState = {
  openMenuDrawer: false
}
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenMenuDrawer: (state: IUISlice, action: PayloadAction<IUISlice["openMenuDrawer"]>) => {
      state.openMenuDrawer = action.payload;
    },
    openMenuDrawer: (state: IUISlice, action: PayloadAction<IUISlice["openMenuDrawer"]>) => {
      state.openMenuDrawer = true;
    },
    closeMenuDrawer: (state: IUISlice, action: PayloadAction<IUISlice["openMenuDrawer"]>) => {
      state.openMenuDrawer = false;
    }
  }
})
