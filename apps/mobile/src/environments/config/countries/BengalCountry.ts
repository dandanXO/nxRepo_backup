import {ICountry} from "../../types/ICountry";
import {IAllCountryIdentityName} from "../IAllCountryIdentityName";
import {GreenThemeConfig} from "@frontend/mobile/shared/ui";

export const BengalCountry: ICountry = {
  country: IAllCountryIdentityName.BN,
  countryName: "Bengal", // NOTE: just for debuging
  currency: "৳",
  language: "bn_BD",
  themeConfig: GreenThemeConfig,
}
