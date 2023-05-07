import { IThemeConfig } from "@frontend/mobile/shared/ui";
import { IAllCountryIdentityName } from "../config/IAllCountryIdentityName";
import { AllCountry } from "../config/AllCountry";

export const getThemeConfig = (
    targetCountry: IAllCountryIdentityName
): IThemeConfig => {
    const currentCountryList = AllCountry.filter(
        (country) => country.country === targetCountry
    );
    return currentCountryList[0].themeConfig;
};
