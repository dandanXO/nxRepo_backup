import {GlobalAppMode} from "../../application/GlobalAppMode";
import {AppModeEnum} from "../../application/AppModeEnum";

export const isSimpleWebView = (): boolean => {
    return GlobalAppMode.mode === AppModeEnum.SimpleWebView;
};
