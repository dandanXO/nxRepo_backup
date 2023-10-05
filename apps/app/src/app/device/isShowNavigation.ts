// NOTICE: refactor me
// export const isInAndroid = ():boolean => typeof window["IndexTask"] !== "undefined";
// 先預設都再 android 之後純 web 再想辦法


import {GlobalAppMode} from "../application/GlobalAppMode";
import {AppModeEnum} from "../application/AppModeEnum";

export const isShowNavigation = (): boolean => {
  return GlobalAppMode.mode !== AppModeEnum.SimpleWebView;
};
