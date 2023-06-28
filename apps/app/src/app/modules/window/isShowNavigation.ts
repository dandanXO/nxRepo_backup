// NOTICE: refactor me
// export const isInAndroid = ():boolean => typeof window["IndexTask"] !== "undefined";
// 先預設都再 android 之後純 web 再想辦法
import { AppModeEnum } from '../../persistant/appModeModel';
import { AppGlobal } from '../../persistant/nativeAppInfo';

export const isShowNavigation = (): boolean => {
  return AppGlobal.mode !== AppModeEnum.SimpleWebView;
};
