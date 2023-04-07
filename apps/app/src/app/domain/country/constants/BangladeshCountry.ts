
import {DarkGreenThemeConfig} from "@frontend/mobile/shared/ui";
import {ICountry} from "../ICountry";
import {IAllCountryIdentityName} from "./IAllCountryIdentityName";

export const BangladeshCountry: ICountry = {
  country: IAllCountryIdentityName.BN,
  countryName: "Bangladesh", // NOTE: just for debuging
  currency: "৳",
  language: "bn_BD",
  themeConfig: DarkGreenThemeConfig,
}
