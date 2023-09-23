import { AllLanguage } from '../../language/enum/AllLanguage';
import { AllTimezoneEnum } from '../../timezone/enum/AllTimezoneEnum';
import { AllCountryIdentityName } from '../enum/AllCountryIdentityName';

export interface ICountry {
  // NOTE: just for debugging
  countryName: string;
  country: AllCountryIdentityName;
  currency: string;
  // NOTE: ISO_4217 https://en.wikipedia.org/wiki/ISO_4217
  currencyCode: string;
  language: AllLanguage;
  timezone: AllTimezoneEnum;
  defaultUIVersion: string;
}
