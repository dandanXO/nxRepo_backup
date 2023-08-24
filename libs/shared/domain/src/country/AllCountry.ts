import {BangladeshCountry} from "./BangladeshCountry";
import {PakistanCountry} from "./PakistanCountry";
import {ICountry} from "./types/ICountry";
import {IndiaCountry} from "./IndiaCountry";
import {MexicoCountry} from "./MexicoCountry";

// REFACTOR: mobile 那邊有自定義
export const AllCountry: ICountry[] = [
  IndiaCountry,
  PakistanCountry,
  BangladeshCountry,
  MexicoCountry
];

export enum AllCountriesEnum {
  'india'='india',
  'pakistan'='pakistan',
  'mexico'= 'mexico'
}
