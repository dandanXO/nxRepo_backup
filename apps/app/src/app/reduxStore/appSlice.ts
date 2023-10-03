import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetInitServiceResponse } from '../api/appService/GetInitServiceResponse';
import { IAndroidAppInfo } from '../persistant/nativeAppInfo/types/IAndroidAppInfo';
import {NativeAppInfo} from "../persistant/nativeAppInfo";
import queryString from "query-string";

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
  appName: string;
};

const parsedQueryString = queryString.parse(window.location.search);

const initialState: InitailState = {
  mode: AppRunningModeEnum.Unknown,
  token: '',
  isInit: false,
  androidAppInfo: null,
  appName: NativeAppInfo.appName || parsedQueryString['appName'] ? (parsedQueryString['appName'] as string) : "",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: (state: InitailState, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    updateInit: (state: InitailState, action: PayloadAction<GetInitServiceResponse>) => {
      state.init = action.payload;
    },
    updateMode: (state: InitailState, action: PayloadAction<AppRunningModeEnum>) => {
      state.mode = action.payload;
    },
    updateToken: (state: InitailState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateAndroidInfo: (state: InitailState, action: PayloadAction<IAndroidAppInfo>) => {
      state.androidAppInfo = action.payload;
    },
  },
});
