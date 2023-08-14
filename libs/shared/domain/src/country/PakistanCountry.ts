import {ICountry} from "./types/ICountry";
import {AllCountryIdentityName} from "./enum/AllCountryIdentityName";

export const PakistanCountry: ICountry = {
  country: AllCountryIdentityName.PK,
  // NOTE: just for debugging
  countryName: "Pakistan",
  currency: "PKR",
  language: "en_US",
  timezone: "Asia/Karachi",
};
