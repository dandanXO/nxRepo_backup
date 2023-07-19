import { AppModeEnum } from '../../persistant/appModeModel';
import { AppGlobal } from '../../persistant/nativeAppInfo';

export const isSimpleWebView = (): boolean => {
    return AppGlobal.mode === AppModeEnum.SimpleWebView;
};
