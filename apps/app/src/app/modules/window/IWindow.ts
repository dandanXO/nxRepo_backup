import "./isInAndroid"
import "./onUploadKycBackgroundData"

export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}

export type AndroidAppInfo = {
  domain: string;
  environment: "india" | "pakistan";
  packageId: string;
  appName: string;
  uiVersion: string;
  token: string;
}
declare global {
  interface Window {
    // NOTICE: 與 APP 的交互
    IndexTask: {
      uploadKycBackgroundData: () => void;
      // NOTICE: Android 缺(不可能每次打開 APP 都問吧)
      hasAuthorizationToUploadKyc: () => boolean;
      navToPage:  (androidPage: AndroidPage) => void;
    };
    onUploadKycBackgroundData: (uploaded: boolean) => void;
    theme?: any;
    isInAndroid: () => boolean;
    AppInfoTask: {
      getAppInfo: () => AndroidAppInfo;
    }
  }
}

