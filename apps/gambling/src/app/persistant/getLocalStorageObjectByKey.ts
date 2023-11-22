import {AppLocalStorage} from "./localstorage";

export function getLocalStorageObjectByKey<ResultObject>(key: string): ResultObject {
  return AppLocalStorage.getItem(key) !== null ? JSON.parse(AppLocalStorage.getItem(key) || "") : null;
}
