import './isInAndroid';
import './onUploadKycBackgroundData';
import { IThemeConfig } from '@frontend/mobile/shared/ui';

export enum AndroidPage {
  LOGIN = 'LOGIN',
  AUTH = 'AUTH',
}

declare global {
  interface Window {
    // NOTICE: 與 APP 的交互
    IndexTask: {
      uploadKycBackgroundData: () => void;
      // NOTICE: Android 缺(不可能每次打開 APP 都問吧)
      hasAuthorizationToUploadKyc: () => boolean;
      navToPage: (androidPage: AndroidPage) => void;
    };
    onUploadKycBackgroundData: (uploaded: boolean) => void;
    theme?: IThemeConfig;
    AppInfoTask: {
      // getAppInfo: () => AndroidAppInfo;
      getAppInfo: () => string;
    };
    reduxStore: any;
  }
}
