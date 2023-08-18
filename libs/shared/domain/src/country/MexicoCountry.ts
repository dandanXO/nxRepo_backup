import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";
import {AllTimezoneEnum} from "../timezone/enum/AllTimezoneEnum";
import {AllLanguage} from "../language/enum/AllLanguage";

export const MexicoCountry: ICountry = {
  country: AllCountryIdentityName.MX,
  // NOTE: just for debugging
  countryName: "Mexico",
  currency: "$",
  currencyCode: "mxn",
  language: AllLanguage.en_US,
  timezone: AllTimezoneEnum["America/Mexico_City"],
};
