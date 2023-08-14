import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";
import {AllTimezoneEnum} from "../timezone/enum/AllTimezoneEnum";
import {AllLanguage} from "../language/enum/AllLanguage";

export const PakistanCountry: ICountry = {
  country: AllCountryIdentityName.PK,
  // NOTE: just for debugging
  countryName: "Pakistan",
  currency: "PKR",
  currencyCode: "PKR",
  language: AllLanguage.en_US,
  timezone: AllTimezoneEnum["Asia/Karachi"],
};
