import {AppModeEnum} from "../../application/AppModeEnum";

export type AppMode = null | AppModeEnum.SimpleWebView | AppModeEnum.IndexWebview | AppModeEnum.PureH5;

export class AppStorage {
  static set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  static get(key: string): string | null {
    return localStorage.getItem(key);
  }
  static remove(key: string) {
    localStorage.removeItem(key);
  }
}

function isLocalStorageAvailable() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

console.log('[app][ability] isLocalStorageAvailable', isLocalStorageAvailable());
