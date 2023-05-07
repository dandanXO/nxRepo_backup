import { ICountry } from "../../types/ICountry";
import { IAllCountryIdentityName } from "../IAllCountryIdentityName";
import { GreenThemeConfig } from "@frontend/mobile/shared/ui";

export const PakistanCountry: ICountry = {
    country: IAllCountryIdentityName.PK,
    countryName: "Pakistan", // NOTE: just for debuging
    currency: "PKR",
    language: "en_US",
    themeConfig: GreenThemeConfig,
};
