import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";
import {AllTimezoneEnum} from "../timezone/enum/AllTimezoneEnum";
import {AllLanguage} from "../language/enum/AllLanguage";

export const IndiaCountry: ICountry = {
  country: AllCountryIdentityName.IN,
  // NOTE: just for debugging
  countryName: "India",
  currency: "₹",
  currencyCode: "INR",
  language: AllLanguage.en_US,
  timezone: AllTimezoneEnum["Asia/Kolkata"],
};
