import {AllCountryIdentityName} from "../AllCountryIdentityName";
import {IAllLanguage} from "../../language/types/IAllLanguage";
import {IAllTimezone} from "../AllTimezone";

export interface ICountry {
  // NOTE: just for debugging
  countryName: string;
  country: AllCountryIdentityName;
  currency: string;
  language: IAllLanguage;
  timezone: IAllTimezone;
}
