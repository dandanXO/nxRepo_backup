import { PakistanCountry } from '../../../../libs/shared/domain/src/country/PakistanCountry';
import { IEnvironment } from '../app/modules/appEnvironment/IEnvironment';

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
