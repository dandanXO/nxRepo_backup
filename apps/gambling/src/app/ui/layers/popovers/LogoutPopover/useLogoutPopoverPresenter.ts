import {AppLocalStorage} from "../../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";

export const useLogoutPopoverPresenter = () => {
  const logout = () => {
    AppLocalStorage.removeItem(AppLocalStorageKey.token);
    AppLocalStorage.removeItem(AppLocalStorageKey.userInfo);
    AppLocalStorage.removeItem(AppLocalStorageKey.kPhone);
    // AppLocalStorage.removeItem("kPassword");
  }
  return {
    logout,
  }
}
