import {AppModeEnum} from "./AppModeEnum";

interface IGlobalAppMode {
  mode: AppModeEnum
}
// NOTE: App 在哪個環境下運行
export const GlobalAppMode: IGlobalAppMode = {
  mode: AppModeEnum.Unset,
};
