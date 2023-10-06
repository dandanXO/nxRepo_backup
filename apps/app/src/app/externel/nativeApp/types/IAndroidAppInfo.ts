import {AllCountriesEnum} from '@frontend/shared/domain';

export type IAndroidAppInfo = {
  environment: AllCountriesEnum;
  packageId: string;
  uiVersion: string;
  token: null | string;
  domain: string;
  appName: string;
  phoneNo: string;
  // TODO: refactor me
  // NOTE: 前端判斷出來的
  mode: 'Webview' | 'H5';
};
