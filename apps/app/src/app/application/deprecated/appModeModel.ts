import {AppLocalStorage, AppMode, AppStorage} from "../../persistant/localstorage";

export class AppModeModel {
  static setMode(mode: AppMode) {
    AppStorage.set('appMode', mode ? mode : '');
  }

  static getMode(): string {
    const modeStr = AppLocalStorage.getItem('appMode') || '';
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
    AppLocalStorage.removeItem(key);
  }
}

// NOTICE: 預設
// AppPersistentModel.setMode(AppModeEnum.SimpleWebView);
