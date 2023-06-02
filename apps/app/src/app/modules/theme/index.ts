import { IAndroidAppInfo } from '../../persistant/nativeAppInfo/types/IAndroidAppInfo';
import { applyTheme } from './utils';

const applyCustomSharedLibTheme = (androidAPPInfo: IAndroidAppInfo) => {
  import(`../../../environments/theme/${androidAPPInfo.environment}/v${androidAPPInfo.uiVersion}/theme`).then(
    (content) => {
      window.theme = content.themeConfig;
    }
  ).catch((error) => {
    throw error;
    console.log("[app][theme] applyCustomSharedLibTheme.error", error);
  })
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
