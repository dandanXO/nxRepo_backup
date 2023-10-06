import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {GetInitServiceResponse} from '../externel/backend/appService/GetInitServiceResponse';
import {IAndroidAppInfo} from '../externel/nativeApp/types/IAndroidAppInfo';
import {AppProxy} from '../proxy/appProxy';

export enum AppRunningModeEnum {
  'Unknown',
  'WEB',
  'InAndroid',
}

export type InitialState = {
  init?: GetInitServiceResponse;
  mode: AppRunningModeEnum;
  // token: string;
  isInit: boolean;
  androidAppInfo: null | IAndroidAppInfo;
  appName: string;
  appID: string;
  appDomain: string;
};



const initialState: InitialState = {
  mode: AppRunningModeEnum.Unknown,
  // token: '',
  isInit: false,
  androidAppInfo: null,
  appName: AppProxy.appName,
  appID: AppProxy.appID,
  appDomain: AppProxy.appDomain,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    updateInit: (state: InitialState, action: PayloadAction<GetInitServiceResponse>) => {
      state.init = action.payload;
    },
    updateMode: (state: InitialState, action: PayloadAction<AppRunningModeEnum>) => {
      state.mode = action.payload;
    },
    // updateToken: (state: InitialState, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    // },
    updateAndroidInfo: (state: InitialState, action: PayloadAction<IAndroidAppInfo>) => {
      state.androidAppInfo = action.payload;
    },
    updateAppInfo: (state: InitialState, action: PayloadAction<{appName: string; appID: string; appDomain: string;}>) => {
      state.appName = action.payload.appName;
      state.appID = action.payload.appID;
      state.appDomain = action.payload.appDomain;
    }
  },
});
