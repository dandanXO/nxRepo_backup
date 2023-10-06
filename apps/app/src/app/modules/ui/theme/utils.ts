import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';

import { AllCountriesEnum } from '../../../../../../../libs/shared/domain/src/country/AllCountry';
import {
  DEFAULT_INDIA_THEME,
  DEFAULT_MEXICO_THEME,
  DEFAULT_PAKISTAN_THEME,
  DEFAULT_PHILIPPINES_THEME,
  themes,
} from '../../../../environments/themeModule/customTailwindTheme';
import { SentryModule } from '../../sentry';
import { mapCustomTailwindTheme } from './mapCustomTailwindTheme';
import { IMappedTheme, ITheme } from './types';

function getDefaultTheme() {
  if (environment.country === IndiaCountry.country) {
    return mapCustomTailwindTheme(themes['india'][DEFAULT_INDIA_THEME]);
  } else if (environment.country === PakistanCountry.country) {
    return mapCustomTailwindTheme(themes['pakistan'][DEFAULT_PAKISTAN_THEME]);
  } else if (environment.country === MexicoCountry.country) {
    return mapCustomTailwindTheme(themes['mexico'][DEFAULT_MEXICO_THEME]);
  } else if (environment.country === MexicoCountry.country) {
    return mapCustomTailwindTheme(
      themes['philippines'][DEFAULT_PHILIPPINES_THEME]
    );
  } else {
    return mapCustomTailwindTheme(themes['india'][DEFAULT_INDIA_THEME]);
  }
}

export const applyTheme = (country: AllCountriesEnum, theme: string): void => {
  // console.log("applyTheme.country", country);
  // console.log("applyTheme.theme", theme);

  let themeObject: IMappedTheme = {};

  // NOTICE: 有找到 theme 才配置
  if (themes[country] && themes[country][theme]) {
    themeObject = mapCustomTailwindTheme(themes[country][theme]);
  }

  if (Object.keys(themeObject).length === 0) {
    const message = `Please configure Country: ${country} version:${theme}`;
    SentryModule.captureException(new Error(message));
    // alertModal(message);
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
