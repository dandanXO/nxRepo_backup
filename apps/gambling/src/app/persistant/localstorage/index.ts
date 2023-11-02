


export class AppLocalStorage {
  static setItem(key: string, value: string) {
    if (!window.localStorage) {
      window.fakeLocalStorage = window.fakeLocalStorage || {};
      window.fakeLocalStorage[key] = value;
    } else {
      localStorage.setItem(key, value);
    }
  }
  static getItem(key: string): string | null {
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
  static removeItem(key: string) {
    if (!window.localStorage) {
      if (window.fakeLocalStorage && window.fakeLocalStorage[key]) {
        delete window.fakeLocalStorage[key];
      }
    } else {
      localStorage.removeItem(key);
    }
  }
}
