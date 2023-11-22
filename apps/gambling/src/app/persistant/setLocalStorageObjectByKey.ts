import {AppLocalStorage} from "./localstorage";

export function setLocalStorageObjectByKey(key: string, value: any) {
  AppLocalStorage.setItem(key, JSON.stringify(value));
}
