import {AppLocalStorage} from "./localstorage";
import {AppLocalStorageKey} from "./AppLocalStorageKey";

export function getLocalStorageObjectByKey<ResultObject>(key: AppLocalStorageKey): ResultObject {
  return AppLocalStorage.getItem(key) !== null ? JSON.parse(AppLocalStorage.getItem(key) || "") : null;
}
