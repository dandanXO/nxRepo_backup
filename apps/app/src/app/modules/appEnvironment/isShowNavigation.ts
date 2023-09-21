// NOTICE: refactor me
// export const isInAndroid = ():boolean => typeof window["IndexTask"] !== "undefined";
// 先預設都再 android 之後純 web 再想辦法

import {GlobalAppMode} from "../../persistant/GlobalAppMode";
import {AppModeEnum} from "../../persistant/enum/AppModeEnum";

export const isShowNavigation = (): boolean => {
  return GlobalAppMode.mode !== AppModeEnum.SimpleWebView;
};
