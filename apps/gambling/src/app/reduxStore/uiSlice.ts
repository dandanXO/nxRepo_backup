import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IUISlice = {
  openMenuDrawer: boolean;
  openUserInfoStatusPopover: boolean;
}
const initialState = {
  openMenuDrawer: false,
  openUserInfoStatusPopover: false,
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
    },
    setUserInfoStatusPopover: (state: IUISlice, action: PayloadAction<IUISlice["openUserInfoStatusPopover"]>) => {
      state.openUserInfoStatusPopover = action.payload;
    },
    openUserInfoStatusPopover: (state: IUISlice) => {
      state.openUserInfoStatusPopover = true;
    },
    closeUserInfoStatusPopover: (state: IUISlice) => {
      state.openUserInfoStatusPopover = false;
    }

  }
})
