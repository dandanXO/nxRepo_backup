import {AllCountryIdentityName} from "../enum/AllCountryIdentityName";
import {AllTimezoneEnum} from "../../timezone/enum/AllTimezoneEnum";
import {AllLanguage} from "../../language/enum/AllLanguage";

export interface ICountry {
  // NOTE: just for debugging
  countryName: string;
  country: AllCountryIdentityName;
  currency: string;
  // NOTE: ISO_4217 https://en.wikipedia.org/wiki/ISO_4217
  currencyCode: string;
  language: AllLanguage;
  timezone: AllTimezoneEnum;
}
