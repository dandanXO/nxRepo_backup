import {IAllLanguage} from "../config/languages/IAllLanguage";
import {IAllCountryIdentityName} from "../config/IAllCountryIdentityName";
import {IThemeConfig} from "@frontend/mobile/shared/ui";

export interface ICountry {
  countryName: string; // NOTE: just for debuging
  country: IAllCountryIdentityName;
  currency: string;
  language: IAllLanguage;
  themeConfig: IThemeConfig;
}
