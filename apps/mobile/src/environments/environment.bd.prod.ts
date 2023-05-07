import { IEnvironment } from "./types/IEnvironment";
import { BangladeshCountry } from "./config/countries/BangladeshCountry";

export const environment: IEnvironment = {
    production: true,
    ...BangladeshCountry,
};
