import { IEnvironment } from '../app/modules/environment/IEnvironment';
import { PakistanCountry } from '../../../../libs/shared/domain/src/country/PakistanCountry';

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
