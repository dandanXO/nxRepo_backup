import {AppModeEnum} from "../../application/AppModeEnum";
import {GlobalAppMode} from "../../application/GlobalAppMode";
import {alertModal} from "../../ui/components/alertModal";
import {SentryModule} from "../../modules/sentry";

export type AppMode = null | AppModeEnum.SimpleWebView | AppModeEnum.IndexWebview | AppModeEnum.PureH5;

export class AppStorage {
  static set(key: string, value: any) {
    AppLocalStorage.setItem(key, value);
  }
  static get(key: string): string | null {
    return AppLocalStorage.getItem(key);
  }
  static remove(key: string) {
    AppLocalStorage.removeItem(key);
  }
}

function isLocalStorageAvailable() {
  const test = 'test';
  try {
    AppLocalStorage.setItem(test, test);
    AppLocalStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

console.log('[app][ability] isLocalStorageAvailable', isLocalStorageAvailable());

export class AppLocalStorage {
  static setItem(key: string, value: string) {
    if(!window.localStorage) {
      if(GlobalAppMode.mode === "PureH5") {
        const message = "Please do not use browser in private mode or in-app. Need to open App Native Browser";
        SentryModule.captureException(new Error(message));
        alertModal(message);
        return;
      } else if(GlobalAppMode.mode === "IndexWebview" || GlobalAppMode.mode === "SimpleWebView"){
        window.fakeLocalStorage = window.fakeLocalStorage || {}
        window.fakeLocalStorage[key] = value;
      }
    } else {
      localStorage.setItem(key, value);
    }
  }
  static getItem(key: string): string | null {
    let returnItem = null;
    if (!window.localStorage) {
      if (GlobalAppMode.mode === "PureH5") {
        const message = "Please do not use browser in private mode or in-app. Need to open App Native Browser";
        SentryModule.captureException(new Error(message));
        alertModal(message);
        return null;
      } else if (GlobalAppMode.mode === "IndexWebview" || GlobalAppMode.mode === "SimpleWebView") {
        if (window.fakeLocalStorage && window.fakeLocalStorage[key]) {
          returnItem = window.fakeLocalStorage[key];
        }
      }
    } else {
      returnItem = localStorage.getItem(key);
    }
    return returnItem;
  }
  static removeItem(key: string) {
    if (!window.localStorage) {
      if (GlobalAppMode.mode === "PureH5") {
        const message = "Please do not use browser in private mode or in-app. Need to open App Native Browser";
        SentryModule.captureException(new Error(message));
        alertModal(message);
      } else if (GlobalAppMode.mode === "IndexWebview" || GlobalAppMode.mode === "SimpleWebView") {
        if (window.fakeLocalStorage && window.fakeLocalStorage[key]) {
          delete window.fakeLocalStorage[key];
        }
      }
    } else {
      localStorage.removeItem(key);
    }
  }
}
