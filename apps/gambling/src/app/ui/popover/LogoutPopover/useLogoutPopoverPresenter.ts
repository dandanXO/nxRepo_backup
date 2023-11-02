import {AppLocalStorage} from "../../../persistant/localstorage";

export const useLogoutPopoverPresenter = () => {
  const logout = () => {
    AppLocalStorage.removeItem("token");
    AppLocalStorage.removeItem("userInfo");
    AppLocalStorage.removeItem("kPhone");
    AppLocalStorage.removeItem("kPassword");
  }
  return {
    logout,
  }
}
