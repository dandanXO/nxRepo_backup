import { AllLanguage } from '../language/enum/AllLanguage';
import { AllTimezoneEnum } from '../timezone/enum/AllTimezoneEnum';
import { AllCountryIdentityName } from './enum/AllCountryIdentityName';
import { ICountry } from './types/ICountry';

export const BangladeshCountry: ICountry = {
  country: AllCountryIdentityName.BN,
  // NOTE: just for debugging
  countryName: 'Bangladesh',
  currency: '৳',
  currencyCode: 'BDT',
  language: AllLanguage.bn_BD,
  timezone: AllTimezoneEnum['Asia/Dhaka'],
  defaultUIVersion: 'v1',
};
