import {IThemeConfig} from "@frontend/mobile/shared/ui";
import {IAllCountryIdentityName} from "../../../../../../libs/shared/domain/src/country/constants/IAllCountryIdentityName";
import {AllCountry} from "../../../../../../libs/shared/domain/src/country/constants/AllCountry";


export const getThemeConfig = (targetCountry: IAllCountryIdentityName): IThemeConfig => {
  const currentCountryList = AllCountry.filter(country => country.country === targetCountry)
  return currentCountryList[0].themeConfig;
}
