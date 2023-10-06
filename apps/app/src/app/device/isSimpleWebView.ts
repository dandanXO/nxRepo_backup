import { AppModeEnum } from '../application/AppModeEnum';
import { GlobalAppMode } from '../application/GlobalAppMode';

export const isSimpleWebView = (): boolean => {
  return GlobalAppMode.mode === AppModeEnum.SimpleWebView;
};
