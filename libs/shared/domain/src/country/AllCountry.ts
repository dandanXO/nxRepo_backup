import {BangladeshCountry} from "./BangladeshCountry";
import {PakistanCountry} from "./PakistanCountry";
import {ICountry} from "./types/ICountry";
import {IndiaCountry} from "./IndiaCountry";

// REFACTOR: mobile 那邊有自定義
export const AllCountry: ICountry[] = [
  IndiaCountry,
  PakistanCountry,
  BangladeshCountry,
];

