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
    // NOTE: color
    '--primary_main': variables['primary_main'] || '',
    '--primary_variant': variables['primary_variant'] || '',
    '--primary_assistant': variables['primary_assistant'] || '',
    '--secondary_main': variables['secondary_main'] || '',
    '--secondary_variant': variables['secondary_variant'] || '',
    // NOTE: background
    '--custom_bg_primary': variables['custom_bg_primary'] || '',
    '--custom_bg_secondary': variables['custom_bg_secondary'] || '',
    '--custom_bg_tertiary': variables['custom_bg_tertiary'] || '',
    // NOTE: text
    '--custom_text_primary': variables['custom_text_primary'] || '',
    '--custom_text_secondary': variables['custom_text_secondary'] || '',
    '--custom_text_tertiary': variables['custom_text_tertiary'] || '',
    '--custom_text_placeholder': variables['custom_text_placeholder'] || '',

    // NOTE: other
    '--disabled_main': variables['disabled_main'] || '',
    '--disabled_variant': variables['disabled_variant'] || '',

    // NOTE: state
    '--custom_state_disable_main': variables['custom_state_disable_main'] || '',
    '--custom_state_disable_variant': variables['custom_state_disable_variant'] || '',
    '--custom_state_success_main': variables['custom_state_success_main'] || '',
    '--custom_state_warning_main': variables['custom_state_warning_main'] || '',
    '--custom_state_warning_variant': variables['custom_state_warning_variant'] || '',
    '--custom_state_error_main': variables['custom_state_error_main'] || '',
    '--custom_state_error_variant': variables['custom_state_error_variant'] || '',
    '--custom_state_info_main': variables['custom_state_info_main'] || '',
    '--custom_state_info_variant': variables['custom_state_info_variant'] || '',
  };
};

export const applyTheme = (country: "india" | "pakistan", theme: string): void => {
  // console.log("applyTheme.country", country);
  // console.log("applyTheme.theme", theme);
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
