export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}
interface Window {
  // NOTICE: 與 APP 的交互
  IndexTask: {
    uploadKycBackgroundData: () => void;
    navToPage:  (androidPage: AndroidPage) => void;
  }
}

