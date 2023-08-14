import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";

export const BangladeshCountry: ICountry = {
  country: AllCountryIdentityName.BN,
  // NOTE: just for debugging
  countryName: "Bangladesh",
  currency: "৳",
  language: "bn_BD",
  timezone: "Asia/Dhaka"
}
