import {ICountry} from "../types/ICountry";
import {IndiaCountry} from "./countries/IndiaCountry";
import {PakistanCountry} from "./countries/PakistanCountry";
import {BengalCountry} from "./countries/BengalCountry";

export const AllCountry: ICountry[] = [
  IndiaCountry,
  PakistanCountry,
  BengalCountry,
];
