import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetInitServiceResponse } from '../api/appService/GetInitServiceResponse';
import { IAndroidAppInfo } from '../modules/nativeAppInfo/IAndroidAppInfo';

export enum AppRunningModeEnum {
  'Unknown',
  'WEB',
  'InAndroid',
}

export type InitailState = {
  init?: GetInitServiceResponse;
  mode: AppRunningModeEnum;
  token: string;
  isInit: boolean;
  androidAppInfo: null | IAndroidAppInfo;
};

const initialState: InitailState = {
  mode: AppRunningModeEnum.Unknown,
  token: '',
  isInit: false,
  androidAppInfo: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: (state: InitailState, action: PayloadAction<null>) => {
      state.isInit = true;
    },
    updateInit: (
      state: InitailState,
      action: PayloadAction<GetInitServiceResponse>
    ) => {
      state.init = action.payload;
    },
    updateMode: (
      state: InitailState,
      action: PayloadAction<AppRunningModeEnum>
    ) => {
      state.mode = action.payload;
    },
    updateToken: (state: InitailState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateAndroidInfo: (
      state: InitailState,
      action: PayloadAction<IAndroidAppInfo>
    ) => {
      state.androidAppInfo = action.payload;
    },
  },
});
