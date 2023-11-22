import {AppLocalStorage} from "./localstorage";
import {AppLocalStorageKey} from "./AppLocalStorageKey";

export function setLocalStorageObjectByKey(key: AppLocalStorageKey, value: any) {
  AppLocalStorage.setItem(key, JSON.stringify(value));
}
