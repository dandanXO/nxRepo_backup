export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}

declare global {
  interface Window {
    // NOTICE: 與 APP 的交互
    IndexTask: {
      uploadKycBackgroundData: () => void;
      navToPage:  (androidPage: AndroidPage) => void;
    }
    theme?: any;
  }
}

// window.IndexTask = window.IndexTask || {};
// window.theme = window.theme || {};
