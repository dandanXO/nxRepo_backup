export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}

declare global {
  interface Window {
    // NOTICE: 與 APP 的交互
    IndexTask: {
      uploadKycBackgroundData: () => void;
      // NOTICE: Android 缺(不可能每次打開 APP 都問吧)
      hasAuthorizationToUploadKyc: () => boolean;
      navToPage:  (androidPage: AndroidPage) => void;
    }
    theme?: any;
    onUploadKycBackgroundData: (uploaded: boolean) => void;
    isInAndroid: () => boolean;
  }
}

// window.IndexTask = window.IndexTask || {};
// window.theme = window.theme || {};
window["isInAndroid"] = ():boolean => typeof window["IndexTask"]["uploadKycBackgroundData"] !== "undefined";
