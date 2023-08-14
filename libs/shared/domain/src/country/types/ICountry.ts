import {AllCountryIdentityName} from "../enum/AllCountryIdentityName";
import {IAllLanguage} from "../../language/types/IAllLanguage";
import {IAllTimezone} from "../../timezone/types/AllTimezone";

export interface ICountry {
  // NOTE: just for debugging
  countryName: string;
  country: AllCountryIdentityName;
  currency: string;
  language: IAllLanguage;
  timezone: IAllTimezone;
}
