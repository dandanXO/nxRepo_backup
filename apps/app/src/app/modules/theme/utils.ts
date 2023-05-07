import {
  DEFAULT_THEME,
  themes,
} from '../../../environments/theme/customTailwindTheme';
import { IMappedTheme, ITheme } from './types';
import { mapCustomTailwindTheme } from './mapCustomTailwindTheme';

type Countries = 'india' | 'pakistan';

export const applyTheme = (country: Countries, theme: string): void => {
  // console.log("applyTheme.country", country);
  // console.log("applyTheme.theme", theme);
  let themeObject: IMappedTheme = mapCustomTailwindTheme(
    themes[country][theme]
  );
  if (!themeObject) {
    themeObject = mapCustomTailwindTheme(themes['india'][DEFAULT_THEME]);
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
