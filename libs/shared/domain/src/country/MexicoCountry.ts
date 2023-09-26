import { AllLanguage } from '../language/enum/AllLanguage';
import { AllTimezoneEnum } from '../timezone/enum/AllTimezoneEnum';
import { AllCountryIdentityName } from './enum/AllCountryIdentityName';
import { ICountry } from './types/ICountry';

export const MexicoCountry: ICountry = {
  country: AllCountryIdentityName.MX,
  // NOTE: just for debugging
  countryName: 'Mexico',
  currency: '$',
  currencyCode: 'mxn',
  language: AllLanguage.es_MX,
  timezone: AllTimezoneEnum['America/Mexico_City'],
  defaultUIVersion: 'v1',
};
