import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";
import {AllTimezoneEnum} from "../timezone/enum/AllTimezoneEnum";
import {AllLanguage} from "../language/enum/AllLanguage";

export const BangladeshCountry: ICountry = {
  country: AllCountryIdentityName.BN,
  // NOTE: just for debugging
  countryName: "Bangladesh",
  currency: "৳",
  currencyCode: "BDT",
  language: AllLanguage.bn_BD,
  timezone: AllTimezoneEnum["Asia/Dhaka"],
}
