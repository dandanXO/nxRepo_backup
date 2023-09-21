import {GlobalAppMode} from "../../persistant/GlobalAppMode";
import {AppModeEnum} from "../../persistant/enum/AppModeEnum";

export const isSimpleWebView = (): boolean => {
    return GlobalAppMode.mode === AppModeEnum.SimpleWebView;
};
