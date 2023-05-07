import { IEnvironment } from "./types/IEnvironment";
import { IndiaCountry } from "./config/countries/IndiaCountry";

export const environment: IEnvironment = {
    production: true,
    ...IndiaCountry,
};
