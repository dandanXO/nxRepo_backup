import { AllLanguage } from "../language/enum/AllLanguage";
import { AllTimezoneEnum } from "../timezone/enum/AllTimezoneEnum";
import { AllCountryIdentityName } from "./enum/AllCountryIdentityName";
import { ICountry } from "./types/ICountry";

export const PhilippinesCountry: ICountry = {
  country: AllCountryIdentityName.PH,
  // NOTE: just for debugging
  countryName: "Philippines",
  currency: "₱",
  currencyCode: "PHP",
  language: AllLanguage.es_PH,
  timezone: AllTimezoneEnum["Asia/Manila"],
}
