import {ICountry} from "../../types/ICountry";
import {IAllCountryIdentityName} from "../IAllCountryIdentityName";
import {DefaultThemeConfig} from "@frontend/mobile/shared/ui";

export const IndiaCountry: ICountry = {
  country: IAllCountryIdentityName.IN,
  countryName: "India", // NOTE: just for debuging
  currency: "₹",
  language: "en_US",
  themeConfig: DefaultThemeConfig,
};
