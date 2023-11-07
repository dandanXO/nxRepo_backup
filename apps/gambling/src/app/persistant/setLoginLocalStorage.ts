import {AppLocalStorage} from "./localstorage";
import {IUserInfo} from "./pending/loginMode";

export const setLoginLocalStorage = (props: {
  token: string; kPhone: string; kPassword: string; userInfo: IUserInfo, amount: number;
  ip: string;
}) => {
  AppLocalStorage.setItem("token", props.token);
  AppLocalStorage.setItem("userInfo", JSON.stringify(props.userInfo));
  AppLocalStorage.setItem("kPhone", props.kPhone);
  AppLocalStorage.setItem("kPassword", props.kPassword);
  // AppLocalStorage.setItem("amount", String(props.amount));
  AppLocalStorage.setItem("ip", props.ip);
  AppLocalStorage.setItem("userId", String(props.userInfo.user_id));
}

export const clearLoginLocalStorage = () => {
  AppLocalStorage.removeItem("token");
  AppLocalStorage.removeItem("userInfo");
  AppLocalStorage.removeItem("kPhone");
  AppLocalStorage.removeItem("kPassword");
  // AppLocalStorage.removeItem("amount");
  AppLocalStorage.removeItem("ip");
  AppLocalStorage.removeItem("userId");
  AppLocalStorage.removeItem("telegram");
  AppLocalStorage.removeItem("downloadUrl");
}
