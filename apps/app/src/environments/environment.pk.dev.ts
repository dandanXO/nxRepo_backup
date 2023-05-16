import { IEnvironment } from '../app/modules/appEnvironment/IEnvironment';
import { PakistanCountry } from '../../../../libs/shared/domain/src/country/PakistanCountry';

export const environment: IEnvironment = {
  production: false,
  ...PakistanCountry,
};
