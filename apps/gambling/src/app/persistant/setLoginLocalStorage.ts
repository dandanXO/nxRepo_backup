import {AppLocalStorage} from "./localstorage";

import {IUserInfo} from "./IUserInfo";
import {AppLocalStorageKey} from "./AppLocalStorageKey";

export const setLoginLocalStorage = (props: {
  token: string; kPhone: string; kPassword: string; userInfo: IUserInfo, amount: number;
  ip: string;
}) => {
  AppLocalStorage.setItem(AppLocalStorageKey.token, props.token);
  AppLocalStorage.setItem(AppLocalStorageKey.userInfo, JSON.stringify(props.userInfo));
  AppLocalStorage.setItem(AppLocalStorageKey.kPhone, props.kPhone);
  // AppLocalStorage.setItem("amount", String(props.amount));
  AppLocalStorage.setItem(AppLocalStorageKey.ip, props.ip);
  AppLocalStorage.setItem(AppLocalStorageKey.userId, String(props.userInfo.user_id));
}

export const clearLoginLocalStorage = () => {
  AppLocalStorage.removeItem(AppLocalStorageKey.kPhone);
  AppLocalStorage.removeItem(AppLocalStorageKey.token);
  AppLocalStorage.removeItem(AppLocalStorageKey.userId);
  AppLocalStorage.removeItem(AppLocalStorageKey.userInfo);
  AppLocalStorage.removeItem(AppLocalStorageKey.ip);
  AppLocalStorage.removeItem(AppLocalStorageKey.userInfo);
  AppLocalStorage.removeItem(AppLocalStorageKey.gameRecentLocal)
  AppLocalStorage.removeItem(AppLocalStorageKey.useLazyGetUserVIPAllInfoQuery)
  AppLocalStorage.removeItem(AppLocalStorageKey.useGetVIPInfoMutation)
}
