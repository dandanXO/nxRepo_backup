import {GreenThemeConfig} from "@frontend/mobile/shared/ui";
import {ICountry} from "../ICountry";
import {IAllCountryIdentityName} from "./IAllCountryIdentityName";

export const PakistanCountry: ICountry = {
  country: IAllCountryIdentityName.PK,
  countryName: "Pakistan", // NOTE: just for debuging
  currency: "PKR",
  language: "en_US",
  themeConfig: GreenThemeConfig,
};
