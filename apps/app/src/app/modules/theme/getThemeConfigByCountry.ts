import { DefaultThemeConfig, GreenThemeConfig, IThemeConfig } from '@frontend/mobile/shared/ui';

import { AllCountry } from '../../../../../../libs/shared/domain/src/country/AllCountry';
import { AllCountryIdentityName } from '../../../../../../libs/shared/domain/src/country/enum/AllCountryIdentityName';
import { IndiaCountry } from '../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../libs/shared/domain/src/country/PakistanCountry';

export const getThemeConfigByCountry = (targetCountry: AllCountryIdentityName): IThemeConfig => {
  const currentCountryList = AllCountry.filter((country) => country.country === targetCountry);
  // return currentCountryList[0].themeConfig;
  return {
    [IndiaCountry.country]: DefaultThemeConfig,
    [PakistanCountry.country]: GreenThemeConfig,
  }[currentCountryList[0].country];
};
