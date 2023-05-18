// NOTICE: refactor me
// export const isInAndroid = ():boolean => typeof window["IndexTask"] !== "undefined";
// 先預設都再 android 之後純 web 再想辦法
import { AppGlobal } from "../../persistant/nativeAppInfo";
import { AppModeEnum } from "../../persistant/appModeModel";
export const isInAndroid = (): boolean => {
    return AppGlobal.mode === AppModeEnum.SimpleWebView ? true : false
};
