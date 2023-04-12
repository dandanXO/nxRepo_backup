import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetInitServiceResponse} from "../../api/appService/GetInitServiceResponse";

export enum AppRunningModeEnum {
  "Unknown" ,
  "WEB" ,
  "InAndroid"
}

type InitailState = {
  init?: GetInitServiceResponse;
  mode: AppRunningModeEnum;
  token: string;
};

const initialState: InitailState = {
  mode: AppRunningModeEnum.Unknown,
  token: "",
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateInit: (state: InitailState, action: PayloadAction<GetInitServiceResponse>) => {
      state.init = action.payload;
    },
    updateMode: (state: InitailState, action: PayloadAction<AppRunningModeEnum>) => {
      state.mode = action.payload;
    },
    updateToken: (state: InitailState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  }
})
