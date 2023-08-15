import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';
import {MexicoCountry} from "../../../../../../libs/shared/domain/src/country/MexicoCountry";

export const environment: IEnvironment = {
  production: false,
  ...MexicoCountry,
};
