import { AllLanguage } from '../language/enum/AllLanguage';
import { AllTimezoneEnum } from '../timezone/enum/AllTimezoneEnum';
import { AllCountryIdentityName } from './enum/AllCountryIdentityName';
import { ICountry } from './types/ICountry';

export const PakistanCountry: ICountry = {
  country: AllCountryIdentityName.PK,
  // NOTE: just for debugging
  countryName: 'Pakistan',
  currency: 'PKR',
  currencyCode: 'PKR',
  language: AllLanguage.en_US,
  timezone: AllTimezoneEnum['Asia/Karachi'],
  defaultUIVersion: 'v15',
};
