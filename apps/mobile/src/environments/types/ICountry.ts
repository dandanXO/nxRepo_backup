import {ILanguage} from "./ILanguage";

export interface ICountry {
  countryName: string; // NOTE: just for debuging
  country: string;
  currency: string;
  language: ILanguage;
}
