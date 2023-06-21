import {DEFAULT_INDIA_THEME, DEFAULT_PAKISTAN_THEME, themes} from '../../../environments/theme/customTailwindTheme';
import { mapCustomTailwindTheme } from './mapCustomTailwindTheme';
import { IMappedTheme, ITheme } from './types';
import {AppEnvironment} from "../appEnvironment";
import {environment} from "../../../environments/environment";
import {IndiaCountry} from "../../../../../../libs/shared/domain/src/country/IndiaCountry";

type Countries = 'india' | 'pakistan';

function getDefaultTheme () {
  if(environment.country === IndiaCountry.country) {
    return mapCustomTailwindTheme(themes['india'][DEFAULT_INDIA_THEME]);
  } else {
    return mapCustomTailwindTheme(themes['pakistan'][DEFAULT_PAKISTAN_THEME]);
  }
}

export const applyTheme = (country: Countries, theme: string): void => {
  // console.log("applyTheme.country", country);
  // console.log("applyTheme.theme", theme);

  let themeObject: IMappedTheme;

  // NOTICE: 有找到 theme 才配置
  if (themes[country] && themes[country][theme]) {
    themeObject = mapCustomTailwindTheme(themes[country][theme]);
    if (!themeObject) {
      themeObject = getDefaultTheme();
    }
  } else {
    themeObject = getDefaultTheme();
  }

  const root = document.documentElement;
  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return;
    }
    root.style.setProperty(property, themeObject[property]);
  });
};

export const extend = (extending: ITheme, newTheme: ITheme): ITheme => {
  return { ...extending, ...newTheme };
};
