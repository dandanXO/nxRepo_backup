import { AllCountriesEnum } from "libs/shared/domain/src/country/AllCountry";

export interface ITheme {
  [key: string]: string;
}

export type IThemes = {
  [country in AllCountriesEnum]: {
    [key: string]: ITheme;
  };
}

export interface IMappedTheme {
  [key: string]: string | null;
}
