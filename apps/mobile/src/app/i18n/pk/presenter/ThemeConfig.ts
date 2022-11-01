import {DefaultThemeConfig, GreenThemeConfig} from "@frontend/mobile/shared/ui";


export const getThemeConfig = (country: string) => {
  switch (country) {
    case 'in':
      return DefaultThemeConfig;
    case 'pk':
      return GreenThemeConfig;
    default:
      return DefaultThemeConfig;
  }
}
