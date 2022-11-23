import {ICountry} from "../types/ICountry";
import {IndiaCountry} from "./countries/IndiaCountry";
import {PakistanCountry} from "./countries/PakistanCountry";
import {BangladeshCountry} from "./countries/BangladeshCountry";

export const AllCountry: ICountry[] = [
  IndiaCountry,
  PakistanCountry,
  BangladeshCountry,
];
