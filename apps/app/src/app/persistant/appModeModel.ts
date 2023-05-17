import {AppMode, AppStorage} from "../modules/localstorage";

export enum AppModeEnum {
  "SimpleWebView" = "SimpleWebView",
  "IndexWebview" = "IndexWebview",
  "PureH5" = "PureH5",
  "None" ="None"
}

export class AppModeModel {
  static setMode(mode: AppMode) {
    AppStorage.set("appMode", mode ? mode : "");
  }

  static getMode(): string {
    const modeStr = localStorage.getItem('appMode') || ""
    return modeStr;
  }

  // static getModeEnum(): AppModeEnum {
  //   const key = AppPersistentModel.getMode();
  //   if(key) {
  //     {
  //       [AppModeEnum.PureH5]: AppModeEnum.PureH5,
  //       [AppModeEnum.IndexWebview]: AppModeEnum.IndexWebview,
  //       [AppModeEnum.PureH5]: AppModeEnum.PureH5,
  //     }[key];
  //   } else {
  //     return  AppModeEnum.SimpleWebView;
  //   }
  // }

  static clear(key: string) {
    localStorage.removeItem(key)
  }
}

// NOTICE: 預設
// AppPersistentModel.setMode(AppModeEnum.SimpleWebView);
