import {IThemeConfig} from "@frontend/mobile/shared/ui";
import {IAllCountryIdentityName} from "../../domain/country/constants/IAllCountryIdentityName";
import {AllCountry} from "../../domain/country/constants/AllCountry";


export const getThemeConfig = (targetCountry: IAllCountryIdentityName): IThemeConfig => {
  const currentCountryList = AllCountry.filter(country => country.country === targetCountry)
  return currentCountryList[0].themeConfig;
}
