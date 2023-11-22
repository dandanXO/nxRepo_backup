import {AppLocalStorageKey} from "../AppLocalStorageKey";


export class AppLocalStorage {
  static setItem(key: AppLocalStorageKey, value: string) {
    if (!window.localStorage) {
      window.fakeLocalStorage = window.fakeLocalStorage || {};
      window.fakeLocalStorage[key] = value;
    } else {
      localStorage.setItem(key, value);
    }
  }
  static getItem(key: AppLocalStorageKey): string | null {
    let returnItem = null;
    if (!window.localStorage) {
      if (window.fakeLocalStorage && window.fakeLocalStorage[key]) {
        returnItem = window.fakeLocalStorage[key];
      }
    } else {
      returnItem = localStorage.getItem(key);
    }
    return returnItem;
  }
  static removeItem(key: AppLocalStorageKey) {
    if (!window.localStorage) {
      if (window.fakeLocalStorage && window.fakeLocalStorage[key]) {
        delete window.fakeLocalStorage[key];
      }
    } else {
      localStorage.removeItem(key);
    }
  }
}
