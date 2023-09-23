import { AllLanguage } from '../language/enum/AllLanguage';
import { AllTimezoneEnum } from '../timezone/enum/AllTimezoneEnum';
import { AllCountryIdentityName } from './enum/AllCountryIdentityName';
import { ICountry } from './types/ICountry';

export const IndiaCountry: ICountry = {
  country: AllCountryIdentityName.IN,
  // NOTE: just for debugging
  countryName: 'India',
  currency: '₹',
  currencyCode: 'INR',
  language: AllLanguage.en_US,
  timezone: AllTimezoneEnum['Asia/Kolkata'],
  defaultUIVersion: 'v55',
};
