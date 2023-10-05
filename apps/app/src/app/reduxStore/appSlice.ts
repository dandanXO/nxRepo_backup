import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetInitServiceResponse } from '../externel/appService/GetInitServiceResponse';
import { IAndroidAppInfo } from '../persistant/nativeAppInfo/types/IAndroidAppInfo';
import {NativeAppInfo} from "../persistant/nativeAppInfo";
import queryString from "query-string";
import {appInfoPersistence} from "../persistant/AppInfoPersistence";

export enum AppRunningModeEnum {
  'Unknown',
  'WEB',
  'InAndroid',
}

export type InitailState = {
  init?: GetInitServiceResponse;
  mode: AppRunningModeEnum;
  // token: string;
  isInit: boolean;
  androidAppInfo: null | IAndroidAppInfo;
  appName: string;
  appID: string;
};

const parsedQueryString = queryString.parse(window.location.search);

const initialState: InitailState = {
  mode: AppRunningModeEnum.Unknown,
  // token: '',
  isInit: false,
  androidAppInfo: null,
  appName: appInfoPersistence.appName || NativeAppInfo.appName || parsedQueryString['appName'] ? (parsedQueryString['appName'] as string) : "",
  appID: appInfoPersistence.appID || NativeAppInfo.packageId || parsedQueryString['packageId'] ? (parsedQueryString['packageId'] as string) : "",
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
    // updateToken: (state: InitailState, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    // },
    updateAndroidInfo: (state: InitailState, action: PayloadAction<IAndroidAppInfo>) => {
      state.androidAppInfo = action.payload;
    },
    updateAppInfo: (state: InitailState, action: PayloadAction<{appName: string; appID: string;}>) => {
      state.appName = action.payload.appName;
      state.appID = action.payload.appID;
    }
  },
});
