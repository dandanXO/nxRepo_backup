import {DefaultThemeConfig, GreenThemeConfig, IThemeConfig} from "@frontend/mobile/shared/ui";


export const getThemeConfig = (country: string): IThemeConfig => {
  switch (country) {
    case 'in':
      return DefaultThemeConfig;
    case 'pk':
      return GreenThemeConfig;
    default:
      return DefaultThemeConfig;
  }
}
