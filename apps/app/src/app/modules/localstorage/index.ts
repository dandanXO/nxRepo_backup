import { AppModeEnum } from "../../persistant/appModeModel";


export type AppMode = null | AppModeEnum.SimpleWebView | AppModeEnum.IndexWebview | AppModeEnum.PureH5;

export class AppStorage {

  static set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  static get(key: string): string | null {
    return localStorage.getItem(key);
  }
  static remove(key: string) {
    localStorage.removeItem(key)
  }
}

