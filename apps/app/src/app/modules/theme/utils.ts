import { themes } from '../../../environments/theme';

export interface ITheme {
  [key: string]: string;
}

// TODO
enum uiVersionCountry {
  "india" ,
  "pakistan"
}

// TODO: refactor
export interface IThemes {
  india: {
    [key: string]: ITheme;
  }
  pakistan: {
    [key: string]: ITheme;
  }
}

export interface IMappedTheme {
  [key: string]: string | null;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
  // console.log("variables", variables);
  return {
    '--primary_main': variables['primary_main'] || '',
    '--primary_variant': variables['primary_variant'] || '',
    '--primary_assistant': variables['primary_assistant'] || '',
    '--secondary_main': variables['secondary_main'] || '',
    '--secondary_variant': variables['secondary_variant'] || '',
    '--disabled_main': variables['disabled_main'] || '',
    '--disabled_variant': variables['disabled_variant'] || '',
  };
};

export const applyTheme = (country: "india" | "pakistan", theme: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[country][theme]);
  if (!themeObject) return;

  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return;
    }
    root.style.setProperty(property, themeObject[property]);
  });
};

export const extend = (
  extending: ITheme,
  newTheme: ITheme
): ITheme => {
  return { ...extending, ...newTheme };
};
