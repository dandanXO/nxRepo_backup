import {BangladeshCountry} from "./BangladeshCountry";
import {PakistanCountry} from "./PakistanCountry";
import {ICountry} from "../ICountry";
import {IndiaCountry} from "./IndiaCountry";

export const AllCountry: ICountry[] = [
  IndiaCountry,
  PakistanCountry,
  BangladeshCountry,
];

export const AllCountryInstance = {
  IndiaCountry,
  PakistanCountry,
  BangladeshCountry
}
