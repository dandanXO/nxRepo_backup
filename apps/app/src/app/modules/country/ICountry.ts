import {IThemeConfig} from "@frontend/mobile/shared/ui";
import { IAllCountryIdentityName } from "./constants/IAllCountryIdentityName";
import {IAllLanguage} from "../language/IAllLanguage";

export interface ICountry {
  countryName: string; // NOTE: just for debuging
  country: IAllCountryIdentityName;
  currency: string;
  language: IAllLanguage;
  themeConfig: IThemeConfig;
}
