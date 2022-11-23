import {ICountry} from "../../types/ICountry";
import {IAllCountryIdentityName} from "../IAllCountryIdentityName";
import {DarkGreenThemeConfig} from "@frontend/mobile/shared/ui";

export const BangladeshCountry: ICountry = {
  country: IAllCountryIdentityName.BN,
  countryName: "Bangladesh", // NOTE: just for debuging
  currency: "৳",
  language: "bn_BD",
  themeConfig: DarkGreenThemeConfig,
}
