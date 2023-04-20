import {AllCountryIdentityName} from "../AllCountryIdentityName";
import {IAllLanguage} from "../../language/types/IAllLanguage";

export interface ICountry {
  // NOTE: just for debugging
  countryName: string;
  country: AllCountryIdentityName;
  currency: string;
  language: IAllLanguage;
}
