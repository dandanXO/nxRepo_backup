import {AllCountriesEnum} from "@frontend/shared/domain";

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
