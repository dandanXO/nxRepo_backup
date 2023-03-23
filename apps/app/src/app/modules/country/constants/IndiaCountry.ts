import {DefaultThemeConfig} from "@frontend/mobile/shared/ui";
import {ICountry} from "../ICountry";
import {IAllCountryIdentityName} from "./IAllCountryIdentityName";

export const IndiaCountry: ICountry = {
  country: IAllCountryIdentityName.IN,
  countryName: "India", // NOTE: just for debuging
  currency: "₹",
  language: "en_US",
  themeConfig: DefaultThemeConfig,
};
