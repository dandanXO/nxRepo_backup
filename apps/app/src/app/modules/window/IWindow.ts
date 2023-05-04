import "./isInAndroid"
import "./onUploadKycBackgroundData"
import {IThemeConfig} from "@frontend/mobile/shared/ui";

export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}

export type AndroidAppInfo = {
  environment: "india" | "pakistan";
  packageId: string;
  uiVersion: string;
  token: string;
  domain: string;
  appName: string;
}

// NOTICE:
// 還款頁 沒有交互appinfo, pk V15 才有, 還款頁在印度v55沒有, 印度 v59 還款可以加，等待
// 綁卡業 沒有交互appinfo, pk V15 才有, 綁卡業在印度v55沒有，印度 v58 綁卡才開始有
// 首頁 有交互 appinfo
// IBAN 有交互 appinfo

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
    theme?: IThemeConfig;
    AppInfoTask: {
      getAppInfo: () => AndroidAppInfo;
      getAppInfoFromIOS: (appInfo: string) => void;
    };
  }
}



