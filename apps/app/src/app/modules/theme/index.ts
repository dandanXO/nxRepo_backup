import { IAndroidAppInfo } from '../../externel/nativeApp/types/IAndroidAppInfo';
import { applyTheme } from './utils';

import {themeConfig} from "./themeConfig";

const applyCustomSharedLibTheme = (androidAPPInfo: IAndroidAppInfo) => {
    window.theme = themeConfig
};

const applyDefaultCustomTailwindTheme = (androidAPPInfo: IAndroidAppInfo) => {
  // NOTE: apply tailwind theme
  applyTheme(androidAPPInfo.environment, 'v' + androidAPPInfo.uiVersion);
};

export const applyCustomTheme = (androidAppInfo: IAndroidAppInfo) => {
  console.log('[app] androidAPPInfo', androidAppInfo);

  if (androidAppInfo) {
    // NOTE: Apply default Custom Tailwind Theme
    applyDefaultCustomTailwindTheme(androidAppInfo);

    // NOTE: Apply default Shared Lib Theme
    applyCustomSharedLibTheme(androidAppInfo);
  }
};
export const ThemeModule = {
  applyCustomTheme,
}
